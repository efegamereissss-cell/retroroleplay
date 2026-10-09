import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Gamepad2, 
  Layers, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const SERVER_IP = "45.143.11.113:22003";
  const DISCORD_URL = "https://discord.gg/dHfezJSG5f";
  const MTA_URI = `mtasa://${SERVER_IP}`;

  const handleCopyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    showToast(`Sunucu IP panoya kopyalandı: ${SERVER_IP}`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const navItems = [
    { label: 'Genel Bakış', href: '#hero', icon: Home, desc: 'Ana sayfa ve canlı durum' },
    { label: 'Sunucu Sistemleri', href: '#systems', icon: Layers, desc: 'Ekonomi, çeteler, araçlar' },
    { label: 'Hard RP Kuralları', href: '#rules', icon: BookOpen, desc: 'FearRP, CK, PK rehberi' },
    { label: 'Güvenlik Mimarisi', href: '#security', icon: ShieldCheck, desc: 'RetroGuard & DDoS kalkanı' },
  ];

  return (
    <>
      {/* Floating Left Miniature Pill Trigger */}
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 p-2 rounded-full bg-white/90 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-2xl"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-all group relative"
          title="Menüyü Genişlet"
        >
          <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          <span className="absolute left-full ml-3 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Hızlı Menü
          </span>
        </button>

        <div className="w-5 h-[1px] bg-slate-200"></div>

        {/* Quick Direct Play Button */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(SERVER_IP);
            showToast(`MTA başlatılıyor! IP: ${SERVER_IP}`, 'success');
            window.location.href = MTA_URI;
          }}
          className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-[#0071e3] hover:text-white transition-all group relative shadow-sm"
          title="Oyuna Bağlan"
        >
          <Gamepad2 className="w-4 h-4" />
          <span className="absolute left-full ml-3 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Oyuna Bağlan
          </span>
        </button>

        {/* Copy IP */}
        <button
          onClick={handleCopyIp}
          className="p-3 rounded-full hover:bg-slate-100 text-slate-600 hover:text-black transition-all group relative"
          title="IP Kopyala"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span className="absolute left-full ml-3 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            IP Kopyala
          </span>
        </button>
      </motion.aside>

      {/* Expandable Slide-Over Glass Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Soft Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-80 sm:w-96 bg-white/95 border-r border-slate-200/90 shadow-2xl backdrop-blur-3xl p-6 flex flex-col justify-between text-[#1d1d1f]"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base tracking-tight font-mono">RETRO V1</h4>
                      <span className="text-[11px] text-slate-500 font-medium">Navigasyon & Sistemler</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="py-6 flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                    Sayfa İçi Bölümler
                  </span>
                  {navItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl hover:bg-blue-50/80 group transition-all"
                      >
                        <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {item.desc}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(SERVER_IP);
                    showToast(`MTA başlatılıyor! IP panoya kopyalandı: ${SERVER_IP}`, 'success');
                    window.location.href = MTA_URI;
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-xs shadow-md transition-all"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Oyuna Bağlan ({SERVER_IP})</span>
                </button>

                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-[#5865F2] hover:text-white text-slate-800 font-semibold text-xs transition-all"
                >
                  <span>Discord Topluluğu</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
