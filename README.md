# ⚡ Retro Roleplay V1 — Multi Theft Auto (MTA) Hard RP Web Sitesi

Modern, Apple tarzı akıcılığa, glassmorphism estetiğine ve kurumsal seviye siber güvenlik mimarisine sahip resmi **Retro Roleplay V1** web platformu.

---

## 🌟 Öne Çıkan Özellikler

### 1. Apple Tarzı Tasarım Dili & Akıcılık
- **Framer Motion Mikro Animasyonları:** Sayfa kaydırıldıkça beliren dinamik Bento Grid kartları, yumuşak yay (spring) fizikleri ve pürüzsüz geçişler.
- **Glassmorphism Arayüzü:** Bulanık cam efektleri (`backdrop-blur-3xl`), derinlik katan ortam ışıkları ve koyu obsidian/slate renk paleti.
- **Modern Tipografi:** Apple SF Pro ve Plus Jakarta Sans standartlarında temiz, okunabilir ve odaklanmış görsel hiyerarşi.

### 2. Canlı Sunucu Entegrasyonu & CTA Butonları
- **Oyuna Bağlan Butonu:** Tek tıkla `mtasa://45.143.11.113:22003` protokolünü çalıştırır ve IP'yi panoya kopyalayarak sesli/görsel toast bildirimi verir.
- **Discord CTA Butonu:** [https://discord.gg/dHfezJSG5f](https://discord.gg/dHfezJSG5f) topluluk sunucusuna anında yönlendirme.
- **Canlı Sunucu İskeleti (Dock):** 
  - IP: `45.143.11.113:22003` (Kopyalanabilir)
  - Oyuncu Durumu: Canlı gösterge (142 / 200)
  - Gecikme (Ping): 14ms (TR Lokasyon)
  - Anti-Cheat: RetroGuard v1.4

### 3. Çok Katmanlı Güvenlik Mimarisi (Security by Design)
- **SQL Injection (SQLi) Koruması (CWE-89):**
  - İkili protokol seviyesinde parametreli sorgular (Prepared Statements / PDO).
  - Girdiler doğrudan SQL dizesine asla eklenmez.
  - Özel SQLi Regex filtre katmanı.
- **XSS Koruması (CWE-79):**
  - React DOM otomatik HTML escaping.
  - Tehlikeli HTML/JavaScript etiketlerini temizleyen giriş sanitizasyonu.
  - Sıkı Content Security Policy (CSP) HTTP başlıkları.
- **CSRF Koruması (CWE-352):**
  - `SameSite=Strict` ve `HttpOnly` bayraklı çerezler.
  - Çift Gönderim Anti-CSRF Token (`X-CSRF-Token`) denetimi.
- **Şifre Entropi & Güç Ölçer:**
  - Gerçek zamanlı 5 seviyeli renkli güvenlik barı (Uzunluk, Büyük/Küçük harf, Rakam, Özel Karakter analizi).
  - bcrypt ile 12 tur tuzlama (Salt Rounds = 12).
- **2FA İki Faktörlü Doğrulama (RFC 6238 TOTP):**
  - Google Authenticator & Authy uyumlu 6 haneli kod doğrulama modalı.
  - 30 saniyelik zaman tabanlı yenileme çemberi.
- **JWT Yetkilendirme & UCP (User Control Panel):**
  - 15 dakikalık Access Token + 7 günlük güvenli Refresh Token mimarisi.
  - Oyuncuların IC Nakit, Banka, Karakterler, Garaj ve Güvenlik Loglarını inceleyebileceği Apple tarzı UCP paneli.

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18 veya üzeri önerilir, test edilmiş sürüm: v24+)
- npm veya yarn

### Geliştirici Modunda Başlatma (Frontend)
```bash
# Proje dizinine gidin
cd C:\Users\eserh\.gemini\antigravity\scratch\retro-roleplay-v1

# Bağımlılıkları yükleyin (Zaten yüklü)
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```
Sunucu başlatıldığında tarayıcınızda `http://localhost:5173` adresinden siteye erişebilirsiniz.

### Üretim Derlemesi (Production Build)
```bash
npm run build
```
Oluşturulan optimize edilmiş ve sıkıştırılmış dosyalar `dist/` klasörüne aktarılır.

---

## 📁 Proje Dosya Yapısı

```
retro-roleplay-v1/
├── dist/                          # Üretime hazır optimize statik dosyalar
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Apple tarzı yüzen buzlu cam navigasyon çubuğu
│   │   ├── Hero.jsx               # Ana karşılama, CTA butonları ve canlı sunucu dock'u
│   │   ├── FeaturesBento.jsx      # Apple tarzı Bento Grid sistem tanıtımları
│   │   ├── RulesSection.jsx       # Hard RP kuralları, FearRP, CK, PK interaktif rehberi
│   │   ├── SecurityShowcase.jsx   # Güvenlik mimarisi ve kod blokları sergisi
│   │   ├── AuthModal.jsx          # Giriş, Kayıt, Şifre Gücü Ölçer ve 2FA TOTP modalı
│   │   ├── UcpDashboard.jsx       # Kullanıcı Kontrol Paneli (Karakterler, Araçlar, Bakiye)
│   │   ├── Toast.jsx              # Pürüzsüz bildirim hapları
│   │   └── Footer.jsx             # Alt bilgi, yasal bildirimler ve bağlantılar
│   ├── context/
│   │   └── AuthContext.jsx        # JWT, 2FA ve kullanıcı oturum durum yönetimi
│   ├── utils/
│   │   └── security.js            # XSS sanitizasyon ve şifre gücü hesaplayıcı
│   ├── App.jsx                    # Ana uygulama montajı
│   ├── index.css                  # Tailwind CSS v4 ve Glassmorphism stilleri
│   └── main.jsx                   # React giriş noktası
├── server/                        # Güvenlikli Express Backend Mimarisi
│   ├── controllers/
│   │   └── authController.js      # SQLi korumalı, JWT & 2FA destekli auth kontrolcüsü
│   ├── middleware/
│   │   └── securityMiddleware.js  # XSS, SQLi Guard, CSRF ve JWT doğrulayıcılar
│   ├── database/
│   │   └── schema.sql             # MariaDB / MySQL uyumlu veri şeması
│   └── server.js                  # Express API, Helmet ve Rate Limiting sunucusu
├── index.html                     # Plus Jakarta Sans ve JetBrains Mono fontlu ana HTML
├── package.json                   # Bağımlılıklar ve derleme betikleri
└── vite.config.js                 # Vite & Tailwind 4 entegrasyonu
```

---

## 🛡️ Canlı Sunucu Bilgileri
- **Sunucu Adı:** Retro Roleplay V1
- **Platform:** Multi Theft Auto: San Andreas (MTA:SA)
- **Oyun Modu:** Hard Roleplay
- **Sunucu IP:** `45.143.11.113:22003`
- **Doğrudan Bağlantı:** `mtasa://45.143.11.113:22003`
- **Discord:** [discord.gg/dHfezJSG5f](https://discord.gg/dHfezJSG5f)
