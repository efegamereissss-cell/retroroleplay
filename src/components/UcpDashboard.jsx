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
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
      />

      {/* Main Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col text-[#1d1d1f]"
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-sm">
              {user.username.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#1d1d1f]">{user.username}</h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {user.id}
                </span>
              </div>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-black bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center gap-2 overflow-x-auto bg-slate-50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-black'
            }`}
          >
            Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab('characters')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'characters'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-black'
            }`}
          >
            Karakterler ({user.characters?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'vehicles'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-black'
            }`}
          >
            Araçlar ({user.vehicles?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'security'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-black'
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
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Nakit Bakiye (IC)</span>
                  <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
                    ${user.cash?.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-400">Üzerindeki Para</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Banka Hesabı (IC)</span>
                  <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
                    ${user.bank?.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-400">Fleeca Bank San Andreas</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Toplam Oynama Süresi</span>
                  <div className="text-2xl font-bold font-mono text-purple-600 mt-1">
                    {user.playTime}
                  </div>
                  <span className="text-[11px] text-slate-400">MTA:SA Hard RP</span>
                </div>
              </div>

              {/* Character Summary Box */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[#1d1d1f] flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Aktif Karakter Özeti</span>
                  </h4>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Doğrulanmış Aktif Hesap
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">Karakter Adı:</span>
                    <span className="text-[#1d1d1f] font-mono font-bold text-sm">{user.characterName}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">Meslek / Statü:</span>
                    <span className="text-[#1d1d1f] font-semibold text-sm">LSPD Kıdemli Dedektif</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Info */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold text-blue-900 block">Hesap Güvenlik Durumu</span>
                    2FA İki Faktörlü Doğrulama aktif ve IP koruması devrede.
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('security')}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                >
                  Ayarları Gör
                </button>
              </div>
            </div>
          )}

          {activeTab === 'characters' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#1d1d1f]">Mevcut Karakterleriniz</h4>
                <button 
                  onClick={() => showToast('Maksimum karakter sınırına ulaştınız (2/2).', 'info')}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold"
                >
                  + Yeni Karakter Aç
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.characters?.map((char, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-[#1d1d1f] text-sm">{char.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {char.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 space-y-1">
                        <div>Meslek: <span className="text-slate-800 font-medium">{char.job}</span></div>
                        <div>Seviye: <span className="text-slate-800 font-medium">{char.level}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'vehicles' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#1d1d1f]">Garajınızdaki Araçlar</h4>
              {user.vehicles?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.vehicles.map((veh, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-[#1d1d1f] text-sm flex items-center gap-2">
                          <Car className="w-4 h-4 text-blue-600" />
                          {veh.model}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                          {veh.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Plaka: <span className="text-blue-600 font-mono font-bold">{veh.plate}</span>
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
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#1d1d1f]">2FA İki Faktörlü Doğrulama</h5>
                    <p className="text-xs text-slate-500">Google Authenticator veya Authy ile hesap koruması.</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                  Aktif
                </span>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Son Oturum Güvenlik Kayıtları (Audit Log)
                </h5>
                <div className="space-y-2">
                  {user.securityLogs?.map((log, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-blue-600 font-bold">{log.ip}</span>
                        <span className="text-slate-600">{log.device}</span>
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
