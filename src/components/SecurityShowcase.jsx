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
  Sparkles,
  Gamepad2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function SecurityShowcase() {
  const [activeCodeTab, setActiveCodeTab] = useState('sqli');
  const { showToast } = useToast();

  const SERVER_IP = "45.143.11.113:22003";

  const handleConnect = () => {
    navigator.clipboard.writeText(SERVER_IP);
    showToast(`Sunucu IP panoya kopyalandı: ${SERVER_IP}`, 'success');
    window.location.href = `mtasa://${SERVER_IP}`;
  };

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
      title: 'DDoS & Ağ Filtreleme',
      icon: Lock,
      tag: 'Volumetric Korumalı',
      desc: 'VDS sunucumuz katman 4 (L4) ve katman 7 (L7) anti-DDoS filtre donanımlarıyla korunur. Düşük gecikmeli ve kopmasız oyun deneyimi.',
      benefit: 'Kesintisiz Uptime'
    },
    {
      title: 'RetroGuard Kernel Anti-Cheat',
      icon: Key,
      tag: 'MTA 1.6+ Entegre',
      desc: 'Bellek manipülasyonu, hız hileleri, aimbot ve enjektörleri anında tespit eden özel client-side ve server-side hile koruması.',
      benefit: 'Adil Rol Ortamı'
    },
    {
      title: 'Kriptografik Güvenlik (Argon2/bcrypt)',
      icon: Fingerprint,
      tag: 'Yüksek Entropi',
      desc: 'Oyun içi veri tabanı şifreleme ve oyuncu veri bütünlüğü modern kriptografik hash fonksiyonları ile güvenceye alınmıştır.',
      benefit: 'Veri Bütünlüğü'
    },
    {
      title: 'Brute-Force & Rate Limiting',
      icon: AlertOctagon,
      tag: 'Ağ İzolasyonu',
      desc: 'Şüpheli paket akışları ve flood denemelerine karşı IP bazlı akıllı paket sınırlandırma ve otomatik geçici ban protokolü.',
      benefit: 'Otomatik Kalkan'
    }
  ];

  const codeSnippets = {
    sqli: `// Retro Roleplay V1 - Parametreli SQL Prepared Statement Mimarisi
// SQL Injection saldırılarını matematiksel olarak imkansız kılar.
const [rows] = await db.execute(
  'SELECT id, username, cash, bank, role FROM characters WHERE character_name = ? LIMIT 1',
  [sanitizedCharacterName] // Parametre ayrıştırılır, kod olarak çalıştırılamaz.
);`,
    jwt: `// Sunucu Veri Güvenliği & Network İzolasyonu
// Şüpheli paketleri sınırlandırıp DDoS akışını engeller.
const isPacketLegit = verifyMtaPacketSignature(incomingBuffer, clientIp);
if (!isPacketLegit) {
  dropPacketAndBlacklist(clientIp, { duration: '15m' });
}`,
    twofa: `// RetroGuard Kernel Anti-Cheat Doğrulama Katmanı
const verified = verifyClientIntegrity({
  clientMemoryChecksum: player.checksum,
  luaEngineHash: player.engineHash,
  networkLatency: player.ping
});
if (!verified) {
  kickPlayer(player, "RetroGuard: Yetkisiz dosya degisikligi tespit edildi!");
}`
  };

  return (
    <section id="security" className="relative py-28 px-4 max-w-7xl mx-auto bg-transparent">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-4"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>SIFIR TAVİZLİ SİBER GÜVENLİK STANDARTLARI</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4"
        >
          Güvenlik Bir Özellik Değil, <br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
            Mimarinin Ta Kendisidir.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#6e6e73] text-sm sm:text-base leading-relaxed"
        >
          Sunucumuz, karakterleriniz ve rol emeğiniz en modern kurumsal güvenlik standartlarıyla korunur. 
          RetroGuard Anti-Cheat ve DDoS kalkanı ile kesintisiz Hard RP.
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
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:border-emerald-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1d1d1f] mb-2 group-hover:text-emerald-700 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#6e6e73] leading-relaxed mb-4">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Koruma Seviyesi:</span>
                <span className="font-semibold text-emerald-700 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
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
        className="rounded-3xl bg-[#0f172a] border border-slate-800 shadow-2xl overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            </div>
            <span className="ml-3 text-xs font-mono text-slate-300 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              security-kernel/retro-defense-engine.js
            </span>
          </div>

          {/* Code Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCodeTab('sqli')}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
                activeCodeTab === 'sqli'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SQL Injection Koruması
            </button>
            <button
              onClick={() => setActiveCodeTab('jwt')}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
                activeCodeTab === 'jwt'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Anti-DDoS Ağ Filtresi
            </button>
            <button
              onClick={() => setActiveCodeTab('twofa')}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
                activeCodeTab === 'twofa'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              RetroGuard Anti-Cheat
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 font-mono text-xs sm:text-sm text-cyan-300 leading-relaxed overflow-x-auto">
          <pre className="text-slate-300">
            <code>{codeSnippets[activeCodeTab]}</code>
          </pre>
        </div>

        {/* Terminal Footer CTA */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Kayıt ve giriş zorunluluğu yoktur, dileyen herkes doğrudan bağlanabilir.</span>
          </div>
          <button
            onClick={handleConnect}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Oyuna Doğrudan Bağlan</span>
          </button>
        </div>
      </motion.div>

    </section>
  );
}
