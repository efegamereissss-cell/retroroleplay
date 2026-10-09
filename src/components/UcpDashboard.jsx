import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  ShieldCheck, 
  Wallet, 
  Car, 
  History, 
  LogOut, 
  Clock, 
  CheckCircle2, 
  Lock, 
  Key, 
  Smartphone,
  Sparkles,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UcpDashboard({ isOpen, onClose }) {
  const { user, logout, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'characters' | 'vehicles' | 'security'

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Main Glass Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] rounded-3xl glass-panel border border-white/10 shadow-2xl overflow-hidden flex flex-col backdrop-blur-3xl"
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
              {user.username.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{user.username}</h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {user.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">{user.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="px-6 py-3 border-b border-white/5 flex items-center gap-2 overflow-x-auto bg-black/20">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab('characters')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'characters'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Karakterler ({user.characters?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'vehicles'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Araçlar ({user.vehicles?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'security'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Güvenlik & 2FA
          </button>
        </div>

        {/* Panel Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs text-slate-400 font-medium">Nakit Bakiye (IC)</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                    ${user.cash?.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-400">Üzerindeki Para</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs text-slate-400 font-medium">Banka Hesabı (IC)</span>
                  <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                    ${user.bank?.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-400">Fleeca Bank San Andreas</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs text-slate-400 font-medium">Toplam Oynama Süresi</span>
                  <div className="text-2xl font-bold font-mono text-purple-400 mt-1">
                    {user.playTime}
                  </div>
                  <span className="text-[11px] text-slate-400">MTA:SA Hard RP</span>
                </div>
              </div>

              {/* Character Summary Box */}
              <div className="p-5 rounded-2xl glass-panel border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>Aktif Karakter Özeti</span>
                  </h4>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Whitelist Onaylı
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block mb-1">Karakter Adı:</span>
                    <span className="text-white font-mono font-bold text-sm">{user.characterName}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block mb-1">Meslek / Statü:</span>
                    <span className="text-white font-semibold text-sm">LSPD Kıdemli Dedektif</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Info */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <div className="text-xs text-slate-300">
                    <span className="font-semibold text-white block">Hesap Güvenlik Durumu</span>
                    2FA İki Faktörlü Doğrulama aktif ve IP koruması devrede.
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('security')}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold"
                >
                  Ayarları Gör
                </button>
              </div>
            </div>
          )}

          {activeTab === 'characters' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Mevcut Karakterleriniz</h4>
                <button 
                  onClick={() => showToast('Maksimum karakter sınırına ulaştınız (2/2).', 'info')}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                >
                  + Yeni Karakter Başvurusu
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.characters?.map((char, i) => (
                  <div key={i} className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-white text-sm">{char.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          char.status === 'Aktif' 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                            : 'bg-white/5 text-slate-400'
                        }`}>
                          {char.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>Meslek: <span className="text-slate-200">{char.job}</span></div>
                        <div>Seviye: <span className="text-slate-200">{char.level}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'vehicles' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Garajınızdaki Araçlar</h4>
              {user.vehicles?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.vehicles.map((veh, i) => (
                    <div key={i} className="p-4 rounded-2xl glass-panel border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm flex items-center gap-2">
                          <Car className="w-4 h-4 text-cyan-400" />
                          {veh.model}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                          {veh.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        Plaka: <span className="text-cyan-300 font-mono font-bold">{veh.plate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  Üzerinize kayıtlı araç bulunmuyor. Galerileri ziyaret edebilirsiniz.
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">2FA İki Faktörlü Doğrulama</h5>
                    <p className="text-xs text-slate-400">Google Authenticator veya Authy ile hesap koruması.</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Aktif
                </span>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Son Oturum Güvenlik Kayıtları (Audit Log)
                </h5>
                <div className="space-y-2">
                  {user.securityLogs?.map((log, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-cyan-300 font-bold">{log.ip}</span>
                        <span className="text-slate-400">{log.device}</span>
                      </div>
                      <span className="text-slate-400">{log.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
}
