import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Gamepad2, 
  Menu, 
  X, 
  ExternalLink, 
  Copy, 
  Check
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedIp, setCopiedIp] = useState(false);
  const { showToast } = useToast();

  const SERVER_IP = "45.143.11.113:22003";
  const DISCORD_URL = "https://discord.gg/dHfezJSG5f";
  const MTA_CONNECT_URL = `mtasa://${SERVER_IP}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyIp = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(SERVER_IP);
    setCopiedIp(true);
    showToast(`MTA Sunucu IP'si Kopyalandı: ${SERVER_IP}`, 'success');
    setTimeout(() => setCopiedIp(false), 2500);
  };

  const handleConnectGame = () => {
    navigator.clipboard.writeText(SERVER_IP);
    showToast(`MTA başlatılıyor ve IP panoya kopyalandı: ${SERVER_IP}`, 'success');
    window.location.href = MTA_CONNECT_URL;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 pt-4 pb-2 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Logo & Brand Pill */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/90 border border-slate-200/80 hover:border-blue-500/40 transition-all cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-sm shadow-blue-500/30">
            <Shield className="w-4 h-4 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-base tracking-tight text-[#1d1d1f] font-mono">RETRO</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">V1</span>
            </div>
            <span className="text-[10px] text-slate-500 tracking-wider uppercase font-medium mt-0.5">MTA Hard Roleplay</span>
          </div>
        </motion.div>

        {/* Desktop Navigation Links */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-1 px-4 py-2 rounded-full bg-white/90 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
        >
          <a href="#hero" className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-full transition-all">
            Genel Bakış
          </a>
          <a href="#systems" className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-full transition-all">
            Sistemler
          </a>
          <a href="#rules" className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-full transition-all">
            Kurallar
          </a>
          <a href="#security" className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-full transition-all">
            Güvenlik
          </a>

          {/* Sunucu Canlı IP Kapsülü */}
          <div 
            onClick={handleCopyIp}
            className="flex items-center gap-2 ml-2 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 hover:border-blue-400 cursor-pointer text-slate-700 text-xs font-mono transition-all group"
            title="Tıkla ve IP Kopyala"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-semibold text-[11px] text-[#1d1d1f]">{SERVER_IP}</span>
            {copiedIp ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />}
          </div>
        </motion.nav>

        {/* CTA Buttons Right */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5"
        >
          {/* Discord CTA */}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/30 hover:bg-[#5865F2] hover:text-white text-[#5865F2] text-xs font-semibold transition-all shadow-sm group"
          >
            <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Discord</span>
          </a>

          {/* Quick Connect Button */}
          <button
            onClick={handleConnectGame}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Oyuna Bağlan</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-black shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto mt-3 mx-2 p-5 rounded-3xl bg-white/95 border border-slate-200 shadow-xl backdrop-blur-3xl flex flex-col gap-4 text-[#1d1d1f]"
          >
            <div className="flex flex-col gap-2">
              <a 
                href="#hero" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Genel Bakış
              </a>
              <a 
                href="#systems" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Sistemler & Mekanikler
              </a>
              <a 
                href="#rules" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Hard RP Kuralları
              </a>
              <a 
                href="#security" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Güvenlik & Koruma
              </a>
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  handleConnectGame();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0071e3] text-white font-semibold text-sm shadow-md"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Oyuna Bağlan ({SERVER_IP})</span>
              </button>

              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#5865F2] text-white font-semibold text-sm"
              >
                <span>Discord Sunucusuna Katıl</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
