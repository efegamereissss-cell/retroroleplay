import React from 'react';
import { Shield, Gamepad2, ArrowUpRight, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const SERVER_IP = "45.143.11.113:22003";
  const DISCORD_URL = "https://discord.gg/dHfezJSG5f";
  const MTA_URI = `mtasa://${SERVER_IP}`;

  return (
    <footer className="relative border-t border-slate-200 bg-[#f5f5f7] pt-16 pb-12 px-4 overflow-hidden text-[#1d1d1f]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-sm">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-[#1d1d1f] font-mono tracking-tight">RETRO ROLEPLAY</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">V1</span>
              </div>
            </div>

            <p className="text-xs text-[#6e6e73] max-w-sm leading-relaxed">
              Multi Theft Auto (MTA:SA) platformunda eşsiz, tavizsiz ve modern Hard Roleplay deneyimi.
              Gerçekçi ekonomi, derin karakter hikayeleri ve serbest giriş özgürlüğü.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Discord Topluluğu</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={MTA_URI}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#1d1d1f] text-xs font-semibold flex items-center gap-2 border border-slate-200 transition-all shadow-sm"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Oyuna Bağlan</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider font-mono">
              Hızlı Erişim
            </h5>
            <ul className="space-y-2 text-xs text-[#6e6e73]">
              <li>
                <a href="#hero" className="hover:text-blue-600 transition-colors">Ana Sayfa</a>
              </li>
              <li>
                <a href="#systems" className="hover:text-blue-600 transition-colors">Sunucu Sistemleri</a>
              </li>
              <li>
                <a href="#rules" className="hover:text-blue-600 transition-colors">Hard RP Kuralları</a>
              </li>
              <li>
                <a href="#security" className="hover:text-blue-600 transition-colors">Güvenlik Mimarisi</a>
              </li>
            </ul>
          </div>

          {/* Server Details */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider font-mono">
              Bağlantı Bilgisi
            </h5>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-[11px] text-slate-500">Sunucu Adresi:</div>
              <div className="font-mono text-blue-600 font-bold text-xs select-all">
                {SERVER_IP}
              </div>
              <div className="text-[10px] text-emerald-700 font-medium pt-1">
                Port: 22003 (MTA Varsayılan) • Serbest Giriş
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e6e73]">
          <div>
            © 2026 Retro Roleplay V1. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Apple UI standartları, beyaz tema ve sıfır tavizli güvenlik ile hazırlandı.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
