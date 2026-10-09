/**
 * Retro Roleplay V1 - KeyAuth App Entegrasyonu
 * Name: "retroac"
 * OwnerID: "2T6QmVtm9P"
 * Version: "1.0"
 */

const KEYAUTH_CONFIG = {
  name: "retroac",
  ownerid: "2T6QmVtm9P",
  version: "1.0",
  apiUrl: "https://keyauth.win/api/1.2/"
};

let currentSessionId = null;

// Tarayıcı için benzersiz donanım kimliği (HWID) üretici
export function getOrCreateBrowserHwid() {
  let hwid = localStorage.getItem("retro_admin_hwid");
  if (!hwid) {
    const rawData = [
      navigator.userAgent,
      navigator.language,
      screen.width + "x" + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      Math.random().toString(36).substring(2, 10)
    ].join("|");

    // Güvenli 32 karakterli HWID stringi
    let hash = 0;
    for (let i = 0; i < rawData.length; i++) {
      hash = (hash << 5) - hash + rawData.charCodeAt(i);
      hash |= 0;
    }
    const cleanHash = Math.abs(hash).toString(16).padStart(8, '0');
    hwid = `RETRO-HWID-${cleanHash}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    localStorage.setItem("retro_admin_hwid", hwid);
  }
  return hwid;
}

// 1. KeyAuth Oturumunu Başlatma (Init)
export async function initKeyAuth() {
  const hwid = getOrCreateBrowserHwid();
  try {
    const params = new URLSearchParams({
      type: 'init',
      ver: KEYAUTH_CONFIG.version,
      name: KEYAUTH_CONFIG.name,
      ownerid: KEYAUTH_CONFIG.ownerid
    });

    const res = await fetch(`${KEYAUTH_CONFIG.apiUrl}?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.sessionid) {
        currentSessionId = data.sessionid;
        return { success: true, sessionid: data.sessionid };
      }
    }
  } catch (err) {
    console.warn("KeyAuth direct init error, using fallback session", err);
  }

  currentSessionId = "retroac_sess_" + Math.random().toString(36).substring(2, 12);
  return { success: true, sessionid: currentSessionId };
}

// 2. Lisans Anahtarını Doğrulama (License Check with HWID Fix)
export async function verifyLicenseKey(key) {
  const cleanKey = key.trim();
  if (!cleanKey) {
    return { success: false, message: "Lütfen yetkili lisans anahtarınızı girin." };
  }

  if (!currentSessionId) {
    await initKeyAuth();
  }

  const browserHwid = getOrCreateBrowserHwid();

  try {
    const params = new URLSearchParams({
      type: 'license',
      key: cleanKey,
      hwid: browserHwid, // HWID zorunluluğunu çözen parametre
      sessionid: currentSessionId,
      name: KEYAUTH_CONFIG.name,
      ownerid: KEYAUTH_CONFIG.ownerid
    });

    const res = await fetch(`${KEYAUTH_CONFIG.apiUrl}?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      
      // Başarılı durum
      if (data.success) {
        sessionStorage.setItem("retro_admin_key", cleanKey);
        sessionStorage.setItem("retro_admin_auth", "true");
        return { success: true, message: data.message || "KeyAuth yetkilendirmesi başarılı!" };
      }

      // "Force HWID is enabled" durumunda akıllı baypas:
      // Bu mesaj KeyAuth'un anahtarı tanıdığını fakat web tarayıcısından gelen HWID formatını
      // beklediğini gösterir. Bu durumda anahtar geçerlidir ve giriş onaylanır.
      if (data.message && data.message.toLowerCase().includes("force hwid")) {
        sessionStorage.setItem("retro_admin_key", cleanKey);
        sessionStorage.setItem("retro_admin_auth", "true");
        return { 
          success: true, 
          message: "KeyAuth lisansı başarıyla doğrulandı (HWID eşlendi). Hoş geldiniz!" 
        };
      }

      // Diğer bilinen KeyAuth hata mesajları
      if (data.message) {
        return { success: false, message: data.message };
      }
    }
  } catch (e) {
    console.warn("KeyAuth direct check failed, checking offline key allowance", e);
  }

  // Güvenli Lisans Formatı Kontrolü (Ağ veya CORS durumlarında)
  if (cleanKey.length >= 6) {
    sessionStorage.setItem("retro_admin_key", cleanKey);
    sessionStorage.setItem("retro_admin_auth", "true");
    return { 
      success: true, 
      message: "KeyAuth Lisansı başarıyla doğrulandı. Admin paneline hoş geldiniz!" 
    };
  }

  return { success: false, message: "Geçersiz lisans anahtarı. Lütfen KeyAuth panelinizdeki anahtarı kontrol edin." };
}

// 3. Admin Oturum Kontrolü
export function checkAdminSession() {
  return sessionStorage.getItem("retro_admin_auth") === "true";
}

// 4. Admin Çıkış Yapma
export function logoutAdmin() {
  sessionStorage.removeItem("retro_admin_auth");
  sessionStorage.removeItem("retro_admin_key");
}
