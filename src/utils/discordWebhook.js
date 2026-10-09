/**
 * Retro Roleplay V1 - Discord Webhook Bildirim Servisi
 */

export const CEZALOG_WEBHOOK_URL = "https://discord.com/api/webhooks/1558150655166652539/CIDgXjNCqfmMfrFDtEBaYMxVcIo4UiJ0F9gL6PbYoIDnvO4vvepYzXcsVxcl5JG9Qha7";

/**
 * Ceza Logu Gönderme Fonksiyonu
 */
export async function sendCezaLogWebhook({
  sikayetEden,
  cezalandirilan,
  yetkili,
  sure,
  sebep,
  kanit = ""
}) {
  const embed = {
    title: "⚖️ RETRO ROLEPLAY V1 — RESMİ CEZA KAYDI",
    description: "Yetkili ekibi tarafından işlenen kural ihlali ve uygulanan yaptırım detayları aşağıdadır.",
    color: 14753096, // #E11D48 Crimson Red
    fields: [
      {
        name: "👤 Şikayet Eden",
        value: `\`${sikayetEden || 'Belirtilmedi'}\``,
        inline: true
      },
      {
        name: "🚫 Cezalandırılan Oyuncu",
        value: `\`${cezalandirilan || 'Bilinmiyor'}\``,
        inline: true
      },
      {
        name: "🛡️ Cezalandıran Yetkili",
        value: `\`${yetkili || 'Admin'}\``,
        inline: true
      },
      {
        name: "⏱️ Ceza Süresi",
        value: `**${sure || 'Belirtilmedi'}**`,
        inline: true
      },
      {
        name: "📝 Ceza Sebebi",
        value: `>>> ${sebep || 'Kural İhlali'}`,
        inline: false
      }
    ],
    footer: {
      text: "Retro Roleplay V1 • Ceza Denetim & Sicil Sistemi",
      icon_url: "https://api.iconify.design/lucide:shield-alert.svg"
    },
    timestamp: new Date().toISOString()
  };

  if (kanit && kanit.trim()) {
    embed.fields.push({
      name: "🔗 Kanıt / Ek Bilgi",
      value: kanit.trim(),
      inline: false
    });
  }

  const payload = {
    username: "Retro Roleplay V1 | Ceza Denetim",
    avatar_url: "https://images-ext-1.discordapp.net/external/v5tQ8v_rJgP4H4eB/https/raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield.svg",
    embeds: [embed]
  };

  return await executeWebhook(CEZALOG_WEBHOOK_URL, payload);
}

/**
 * Hile Kontrol Çağırma Fonksiyonu
 */
export async function sendHileKontrolWebhook({
  supheliOyuncu,
  cagiranYetkili,
  supheSebebi,
  sure = "5 Dakika",
  sesliOda = "Hile Kontrol Bekleme Odası 1"
}) {
  const embed = {
    title: "🚨 ACİL HİLE KONTROL ÇAĞRISI — SCREENSHARE / KONTROL",
    description: `**Dikkat:** Oyuncu şüpheli hareketler veya yazılım kullanımı nedeniyle resmi kontrole çağrılmıştır.\nBelirtilen süre içinde sesli odaya bağlanmayan oyuncu **Kalıcı Olarak Uzaklaştırılacaktır (CK / Perma Ban)**.`,
    color: 15733526, // #EF4444 Alert Red
    fields: [
      {
        name: "🎯 Şüpheli Oyuncu",
        value: `\`${supheliOyuncu}\``,
        inline: true
      },
      {
        name: "👮 Çağıran Yetkili",
        value: `\`${cagiranYetkili}\``,
        inline: true
      },
      {
        name: "⏳ Verilen Süre",
        value: `**${sure}** (Gecikme tolere edilmez)`,
        inline: true
      },
      {
        name: "🔊 Beklenen Sesli Oda",
        value: `\`${sesliOda}\``,
        inline: true
      },
      {
        name: "⚠️ İnceleme / Şüphe Sebebi",
        value: `>>> ${supheSebebi}`,
        inline: false
      }
    ],
    footer: {
      text: "Retro Roleplay V1 • RetroGuard Hile Kontrol Birimi",
    },
    timestamp: new Date().toISOString()
  };

  const payload = {
    content: `🚨 **DİKKAT:** \`${supheliOyuncu}\` adlı oyuncu **Hile Kontrolüne** çağrılmıştır! @everyone`,
    username: "RetroGuard | Hile Kontrol Birimi",
    embeds: [embed]
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
