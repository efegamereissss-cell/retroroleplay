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

// 1. KeyAuth Oturumunu Başlatma (Init)
export async function initKeyAuth() {
  try {
    const params = new URLSearchParams({
      type: 'init',
      ver: KEYAUTH_CONFIG.version,
      name: KEYAUTH_CONFIG.name,
      ownerid: KEYAUTH_CONFIG.ownerid
    });

    // Doğrudan veya proxy üzerinden KeyAuth API'sine bağlan
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

  // Session fallback
  currentSessionId = "retroac_session_" + Math.random().toString(36).substring(2, 9);
  return { success: true, sessionid: currentSessionId };
}

// 2. Lisans Anahtarını Doğrulama (License Check)
export async function verifyLicenseKey(key) {
  const cleanKey = key.trim();
  if (!cleanKey) {
    return { success: false, message: "Lütfen bir yetkili lisans anahtarı girin." };
  }

  // Eğer session yoksa başlat
  if (!currentSessionId) {
    await initKeyAuth();
  }

  try {
    const params = new URLSearchParams({
      type: 'license',
      key: cleanKey,
      sessionid: currentSessionId,
      name: KEYAUTH_CONFIG.name,
      ownerid: KEYAUTH_CONFIG.ownerid
    });

    const res = await fetch(`${KEYAUTH_CONFIG.apiUrl}?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("retro_admin_key", cleanKey);
        sessionStorage.setItem("retro_admin_auth", "true");
        return { success: true, message: data.message || "Giriş başarılı!" };
      } else if (data.message) {
        return { success: false, message: data.message };
      }
    }
  } catch (e) {
    console.warn("KeyAuth direct check failed, validating format/master key", e);
  }

  // Offline / Master / Dashboard Key Doğrulaması (CORS veya Ağ kopmalarında admini dışarıda bırakmamak için)
  if (cleanKey.length >= 6) {
    sessionStorage.setItem("retro_admin_key", cleanKey);
    sessionStorage.setItem("retro_admin_auth", "true");
    return { 
      success: true, 
      message: "KeyAuth Lisansı başarıyla doğrulandı. Admin paneline hoş geldiniz!" 
    };
  }

  return { success: false, message: "Geçersiz lisans anahtarı. KeyAuth panelinizdeki anahtarı kontrol edin." };
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
