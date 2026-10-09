import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Radio, 
  Terminal, 
  Cpu, 
  Layers, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchLiveMtaServerStats } from '../utils/mtaQuery';

export default function Hero({ onOpenAuth }) {
  const [copied, setCopied] = useState(false);
  const [serverStats, setServerStats] = useState({
    online: true,
    players: 142,
    maxPlayers: 200,
    ping: 14,
    name: "Retro Roleplay V1",
    version: "MTA:SA 1.6+"
  });

  const { showToast } = useAuth();

  const SERVER_IP = "45.143.11.113:22003";
  const DISCORD_URL = "https://discord.gg/dHfezJSG5f";
  const MTA_URI = `mtasa://${SERVER_IP}`;

  // Canlı MTA Sunucu Verisi Çekici
  useEffect(() => {
    const updateStats = async () => {
      const stats = await fetchLiveMtaServerStats();
      if (stats) setServerStats(stats);
    };

    updateStats();
    const interval = setInterval(updateStats, 20000); // 20 saniyede bir canlı yenile
    return () => clearInterval(interval);
  }, []);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    showToast(`Sunucu IP panoya kopyalandı: ${SERVER_IP}`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePlayNow = () => {
    navigator.clipboard.writeText(SERVER_IP);
    showToast(`MTA başlatılıyor! IP panoya kopyalandı: ${SERVER_IP}`, 'success');
    window.location.href = MTA_URI;
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 sm:pt-40 pb-20 flex flex-col justify-center items-center px-4 overflow-hidden">
      
      {/* Apple-style Subtle Ambient Radial Glows */}
      <div className="glow-orb-cyan top-1/4 -left-20"></div>
      <div className="glow-orb-purple top-1/3 -right-20"></div>

      {/* Cyber Subtle Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Apple Style Top Tag Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill border border-cyan-500/20 shadow-lg shadow-cyan-500/10 mb-8 backdrop-blur-xl"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-xs font-semibold tracking-wide text-cyan-200">
            RETRO ROLEPLAY V1 • HARD RP SEZON 1 AÇILDI
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-cyan-400/80" />
        </motion.div>

        {/* Hero Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.08]"
        >
          Tavizsiz Gerçeklik. <br />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
            Saf Hard Roleplay.
          </span>
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-10 text-balance"
        >
          Multi Theft Auto platformunda yapay kurallardan uzak, dengeli piyasa ekonomisi, 
          derin karakter hikayeleri ve sıfır toleranslı yönetim anlayışıyla inşa edilmiş en prestijli Hard RP sunucusu.
        </motion.p>

        {/* The Two Prominent Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full justify-center mb-14"
        >
          {/* 1. Oyuna Bağlan CTA */}
          <button
            onClick={handlePlayNow}
            className="w-full sm:w-auto min-w-[210px] group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
          >
            <Gamepad2 className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Oyuna Bağlan</span>
            <div className="absolute inset-0 rounded-2xl border border-white/25 pointer-events-none"></div>
          </button>

          {/* 2. Discord'a Katıl CTA */}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-w-[210px] group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass-panel border border-[#5865F2]/40 bg-[#5865F2]/15 hover:bg-[#5865F2]/25 text-white font-bold text-base shadow-xl shadow-[#5865F2]/20 hover:shadow-[#5865F2]/30 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
          >
            <svg className="w-5 h-5 fill-[#8ea1e1] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Discord'a Katıl</span>
            <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100" />
          </a>
        </motion.div>

        {/* Apple Style Floating Live Server Capsule Dock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-3xl"
        >
          {/* Background Ambient Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {/* IP Block */}
            <div 
              onClick={handleCopyIp}
              className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-medium">
                <span>Sunucu IP</span>
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />}
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-cyan-300 truncate">
                {SERVER_IP}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Tıkla ve kopyala</div>
            </div>

            {/* Online Status */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Sunucu Durumu</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">
                {serverStats.online ? 'Aktif' : 'Çevrimdışı'} <span className="text-xs font-normal text-slate-400">({serverStats.players} / {serverStats.maxPlayers})</span>
              </div>
              <div className="text-[11px] text-emerald-400/90 mt-1">Kesintisiz 99.9% Uptime</div>
            </div>

            {/* Ping / Latency */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Ortalama Gecikme</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-amber-300">
                {serverStats.ping} ms <span className="text-xs font-normal text-slate-400">(TR Lokasyon)</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">DDoS Korumalı Hat</div>
            </div>

            {/* Anti-Cheat */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Anti-Cheat</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-purple-300">
                RetroGuard v1.4
              </div>
              <div className="text-[11px] text-slate-400 mt-1">MTA 1.6+ Entegre</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
