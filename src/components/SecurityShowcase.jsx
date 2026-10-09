import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Database, 
  FileCode, 
  Fingerprint, 
  CheckCircle2, 
  Terminal, 
  AlertOctagon,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

export default function SecurityShowcase({ onOpenAuth }) {
  const [activeCodeTab, setActiveCodeTab] = useState('sqli');

  const securityFeatures = [
    {
      title: 'SQL Injection Koruması',
      icon: Database,
      tag: 'CWE-89 Korumalı',
      desc: 'Ham SQL sorguları yerine tamamen parametreli PDO / Prepared Statement ve ORM soyutlaması kullanılır. Kullanıcı girdisi asla doğrudan sorgu dizesine gömülmez.',
      benefit: '%100 Enjeksiyon Engelleme'
    },
    {
      title: 'XSS & HTML Sanitization',
      icon: FileCode,
      tag: 'CWE-79 Korumalı',
      desc: 'Tüm kullanıcı girdileri sıkı sanitizasyon filtresinden geçer. Katı Content-Security-Policy (CSP) başlıkları ile yetkisiz script yürütmesi engellenir.',
      benefit: 'Sıfır Script Sızıntısı'
    },
    {
      title: 'CSRF Token & SameSite Cookie',
      icon: Lock,
      tag: 'CWE-352 Korumalı',
      desc: 'Oturum çerezleri SameSite=Strict ve HttpOnly bayraklarıyla saklanır. Durum değiştiren her API çağrısı kriptografik çift gönderim Anti-CSRF tokeni doğrular.',
      benefit: 'İzinsiz İstek Koruması'
    },
    {
      title: '2FA (TOTP İki Faktörlü Doğrulama)',
      icon: Key,
      tag: 'RFC 6238 Standartı',
      desc: 'Google Authenticator ve Authy ile uyumlu, zaman tabanlı tek kullanımlık şifreler (TOTP). Şifreniz sızsa dahi hesabınız 2. katmanda güvendedir.',
      benefit: 'Donanım/Yazılım Token'
    },
    {
      title: 'Kriptografik Şifreleme (bcrypt/Argon2)',
      icon: Fingerprint,
      tag: '12 Salt Rounds',
      desc: 'Kullanıcı şifreleri asla düz metin (plaintext) olarak tutulmaz. Hesaplama maliyeti yüksek hash fonksiyonlarıyla rainbow table saldırıları etkisiz kılınır.',
      benefit: 'Geri Döndürülemez Hash'
    },
    {
      title: 'Brute-Force & Rate Limiting',
      icon: AlertOctagon,
      tag: 'DDoS & Sözlük Koruması',
      desc: 'IP ve hesap bazlı istek sınırlandırma mimarisi. 5 başarısız denemenin ardından geçici bloklama ve IP seviyesinde soğuma periyodu uygulanır.',
      benefit: 'Otomatik IP İzolasyonu'
    }
  ];

  const codeSnippets = {
    sqli: `// Retro Roleplay V1 - Parametreli SQL Prepared Statement Mimarisi
// SQL Injection saldırılarını matematiksel olarak imkansız kılar.
const [rows] = await db.execute(
  'SELECT id, username, password_hash, two_factor_secret, role FROM users WHERE username = ? LIMIT 1',
  [sanitizedUsername] // Parametre doğrudan ayrıştırılır, kod olarak çalıştırılamaz.
);`,
    jwt: `// JWT Tabanlı Yetkilendirme & HttpOnly Çerez Yönetimi
// XSS ile token çalınmasını engellemek için HttpOnly ve SameSite zorunludur.
const accessToken = jwt.sign(
  { uid: user.id, username: user.username, role: user.role },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: '15m', algorithm: 'HS256' }
);
res.cookie('retro_refresh', refreshToken, {
  httpOnly: true,
  secure: true, // Yalnızca HTTPS
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000
});`,
    twofa: `// 2FA TOTP Doğrulama Katmanı (RFC 6238)
const verified = speakeasy.totp.verify({
  secret: user.two_factor_secret,
  encoding: 'base32',
  token: clientOtpCode,
  window: 1 // +/- 30 saniye saat sapma payı
});
if (!verified) {
  throw new SecurityException("2FA Kodu Hatalı!");
}`
  };

  return (
    <section id="security" className="relative py-28 px-4 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-white/10 text-xs font-semibold text-emerald-300 mb-4"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>SIFIR TAVİZLİ SİBER GÜVENLİK STANDARTLARI</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4"
        >
          Güvenlik Bir Özellik Değil, <br />
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
            Mimarinin Ta Kendisidir.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed"
        >
          Hesabınız, karakterleriniz ve emeğiniz en modern kurumsal güvenlik standartlarıyla korunur. 
          SQLi, XSS ve CSRF tehditlerine karşı çok katmanlı savunma kalkanı.
        </motion.p>
      </div>

      {/* Security Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {securityFeatures.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Koruma Seviyesi:</span>
                <span className="font-semibold text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {feat.benefit}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Code Architecture Terminal Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl glass-panel border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="px-6 py-4 bg-white/[0.02] border-b border-white/10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="ml-3 text-xs font-mono text-slate-300 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              security-kernel/auth-defense-controller.js
            </span>
          </div>

          {/* Code Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCodeTab('sqli')}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
                activeCodeTab === 'sqli'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SQL Injection Önlemi
            </button>
            <button
              onClick={() => setActiveCodeTab('jwt')}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
                activeCodeTab === 'jwt'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              JWT & HttpOnly CSRF
            </button>
            <button
              onClick={() => setActiveCodeTab('twofa')}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
                activeCodeTab === 'twofa'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              TOTP 2FA Doğrulama
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 bg-[#06080d]/90 font-mono text-xs sm:text-sm text-cyan-300 leading-relaxed overflow-x-auto">
          <pre className="text-slate-300">
            <code>{codeSnippets[activeCodeTab]}</code>
          </pre>
        </div>

        {/* Terminal Footer CTA */}
        <div className="px-6 py-4 bg-white/[0.01] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Kayıt ve giriş sisteminde tüm bu güvenlik kontrolleri aktiftir.</span>
          </div>
          <button
            onClick={onOpenAuth}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all shadow-md hover:border-cyan-400/40"
          >
            Güvenli Giriş & Kayıt Sistemini Dene
          </button>
        </div>
      </motion.div>

    </section>
  );
}
