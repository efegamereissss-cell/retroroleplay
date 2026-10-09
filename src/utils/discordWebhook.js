/**
 * Retro Roleplay V1 - Discord Webhook Bildirim Servisi
 * Ultra-Kalın, Net, Belirgin ve Zengin Embed Mimarisi
 */

export const CEZALOG_WEBHOOK_URL = "https://discord.com/api/webhooks/1558150655166652539/CIDgXjNCqfmMfrFDtEBaYMxVcIo4UiJ0F9gL6PbYoIDnvO4vvepYzXcsVxcl5JG9Qha7";

/**
 * 1. CEZA LOGU BİLDİRİMİ (Ultra Kalın & Zengin Embed)
 */
export async function sendCezaLogWebhook({
  sikayetEden,
  cezalandirilan,
  yetkili,
  sure,
  sebep,
  kanit = ""
}) {
  const cleanSikayet = sikayetEden?.trim() || "Yetkili Tespiti / Şikayetsiz";
  const cleanCezalanan = cezalandirilan?.trim() || "Bilinmiyor";
  const cleanYetkili = yetkili?.trim() || "Yetkili Ekibi";
  const cleanSure = sure?.trim() || "Belirtilmedi";
  const cleanSebep = sebep?.trim() || "Kural İhlali";
  const cleanKanit = kanit?.trim();

  const embed = {
    author: {
      name: "RETRO ROLEPLAY V1 • RESMİ ADMİNİSTRASYON HEYETİ",
      icon_url: "https://cdn-icons-png.flaticon.com/512/9422/9422956.png"
    },
    title: "⚖️ RESMİ CEZA VE DİSİPLİN YAPTIRIM KAYDI",
    description: [
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "### 📌 KURAL İHLALİ VE DİSİPLİN İŞLEMİ",
      "> **Sunucu kurallarına aykırı davranış sergileyen oyuncuya yetkili heyeti tarafından resmi yaptırım uygulanmıştır.**",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    ].join("\n"),
    color: 14427686, // #DC2626 - Canlı Ruby Kırmızı
    fields: [
      {
        name: "👤 ŞİKAYET EDEN",
        value: `> ➔ **\`${cleanSikayet}\`**`,
        inline: true
      },
      {
        name: "🚫 CEZALANDIRILAN OYUNCU",
        value: `> ➔ **\`${cleanCezalanan}\`**`,
        inline: true
      },
      {
        name: "🛡️ CEZALANDIRAN YETKİLİ",
        value: `> ➔ **\`${cleanYetkili}\`**`,
        inline: true
      },
      {
        name: "⏳ CEZA SÜRESİ & TÜRÜ",
        value: `> ➔ **\`${cleanSure}\`**`,
        inline: true
      },
      {
        name: "📝 CEZA SEBEBİ / GEREKÇE",
        value: `\`\`\`fix\n${cleanSebep}\n\`\`\``,
        inline: false
      }
    ],
    footer: {
      text: "Retro Roleplay V1 • Disiplin ve Ceza Sicil Sistemi • RetroGuard",
      icon_url: "https://cdn-icons-png.flaticon.com/512/9422/9422956.png"
    },
    timestamp: new Date().toISOString()
  };

  if (cleanKanit) {
    const isUrl = /^https?:\/\//i.test(cleanKanit);
    embed.fields.push({
      name: "🔗 RESMİ KANIT / DOSYA BAĞLANTISI",
      value: isUrl 
        ? `> 🌐 **[Kanıt Dosyasını Görüntüle (Tıklayınız)](${cleanKanit})**\n> \`${cleanKanit}\``
        : `> 📁 **\`${cleanKanit}\`**`,
      inline: false
    });
  }

  const payload = {
    username: "Retro Roleplay V1 | Ceza Sicil Denetim",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/9422/9422956.png",
    embeds: [embed],
    allowed_mentions: { parse: [] }
  };

  return await executeWebhook(CEZALOG_WEBHOOK_URL, payload);
}

/**
 * 2. HİLE KONTROL ÇAĞRISI (Ultra Kalın & Acil Bildirim - Etiketsiz)
 */
export async function sendHileKontrolWebhook({
  supheliOyuncu,
  cagiranYetkili,
  supheSebebi,
  sure = "5 Dakika",
  sesliOda = "Hile Kontrol Bekleme Odası 1"
}) {
  const cleanSupheli = supheliOyuncu?.trim() || "Şüpheli";
  const cleanYetkili = cagiranYetkili?.trim() || "Yetkili Ekibi";
  const cleanSure = sure?.trim() || "5 Dakika";
  const cleanOda = sesliOda?.trim() || "Hile Kontrol Bekleme Odası 1";
  const cleanSebep = supheSebebi?.trim() || "Şüpheli Yazılım / Hareket Tespiti";

  const embed = {
    author: {
      name: "RETROGUARD SHIELD • HİLE VE GÜVENLİK BİRİMİ",
      icon_url: "https://cdn-icons-png.flaticon.com/512/564/564619.png"
    },
    title: "🚨 RETROGUARD • ACİL HİLE KONTROL VE SCREENSHARE ÇAĞRISI",
    description: [
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "### ⚠️ DİKKAT: ŞÜPHELİ YAZILIM / OYUNCU İNCELEMESİ",
      "> **Aşağıda belirtilen oyuncunun şüpheli hareketleri tespit edilmiş olup derhal sesli kanala katılması zorunludur!**",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    ].join("\n"),
    color: 16728064, // #FF3B30 - Apple Neon Hazard Red
    fields: [
      {
        name: "🎯 ŞÜPHELİ OYUNCU",
        value: `> ➔ **\`${cleanSupheli}\`**`,
        inline: true
      },
      {
        name: "👮 ÇAĞIRAN YETKİLİ",
        value: `> ➔ **\`${cleanYetkili}\`**`,
        inline: true
      },
      {
        name: "⏱️ VERİLEN SÜRE",
        value: `> ⏰ **\`${cleanSure}\`** *(Gecikme tolere edilmez)*`,
        inline: true
      },
      {
        name: "🔊 BEKLENEN SESLİ ODA",
        value: `> 🎙️ **\`${cleanOda}\`**`,
        inline: true
      },
      {
        name: "🔍 İNCELEME & ŞÜPHE GEREKÇESİ",
        value: `\`\`\`yaml\n${cleanSebep}\n\`\`\``,
        inline: false
      },
      {
        name: "🛑 PROTOKOL VE YAPTIRIM UYARISI",
        value: [
          ">>> ❗ **1. Verilen süre içerisinde odaya katılmayan oyuncu doğrudan KALICI OLARAK UZAKLAŞTIRILIR (Perma Ban).**",
          "❗ **2. Kontrol esnasında oyundan çıkmak, bilgisayarı kapatmak veya kontrolü reddetmek itiraf sayılır.**",
          "❗ **3. Ekran paylaşımı açılması ve yetkili talimatlarına harfiyen uyulması zorunludur.**"
        ].join("\n"),
        inline: false
      }
    ],
    footer: {
      text: "Retro Roleplay V1 • RetroGuard Hile Kontrol ve Güvenlik Sistemi",
      icon_url: "https://cdn-icons-png.flaticon.com/512/564/564619.png"
    },
    timestamp: new Date().toISOString()
  };

  const payload = {
    content: `🚨 **[ACİL ÇAĞRI]** \`${cleanSupheli}\` adlı oyuncu **Hile Kontrolüne** çağrılmıştır!`,
    username: "RetroGuard | Hile Kontrol Birimi",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/564/564619.png",
    embeds: [embed],
    allowed_mentions: { parse: [] }
  };

  return await executeWebhook(CEZALOG_WEBHOOK_URL, payload);
}

async function executeWebhook(url, payload) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (res.ok || res.status === 204) {
      return { success: true, message: "Discord bildirim mesajı başarıyla gönderildi!" };
    } else {
      const errText = await res.text();
      return { success: false, message: `Discord Webhook Hatası (${res.status}): ${errText}` };
    }
  } catch (err) {
    return { success: false, message: `Bağlantı hatası: ${err.message}` };
  }
}
