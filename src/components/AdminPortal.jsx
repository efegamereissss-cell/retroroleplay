import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Key, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  LogOut, 
  ArrowLeft, 
  Sparkles, 
  FileText, 
  Clock, 
  User, 
  UserX, 
  Radio, 
  RefreshCw,
  Eye,
  Lock
} from 'lucide-react';
import { verifyLicenseKey, checkAdminSession, logoutAdmin } from '../utils/keyauth';
import { sendCezaLogWebhook, sendHileKontrolWebhook } from '../utils/discordWebhook';
import { useToast } from '../context/ToastContext';

export default function AdminPortal({ onBackToHome }) {
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('cezalog'); // 'cezalog' | 'hilekontrol'

  // Ceza Log Form State
  const [cezaForm, setCezaForm] = useState({
    sikayetEden: '',
    cezalandirilan: '',
    yetkili: '',
    sure: '3 Gün',
    sebep: '',
    kanit: ''
  });

  // Hile Kontrol Form State
  const [hileForm, setHileForm] = useState({
    supheliOyuncu: '',
    cagiranYetkili: '',
    supheSebebi: '',
    sure: '5 Dakika',
    sesliOda: 'Hile Kontrol Bekleme Odası 1'
  });

  const [isSending, setIsSending] = useState(false);

  // Check saved session on mount
  useEffect(() => {
    if (checkAdminSession()) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle KeyAuth Login
  const handleKeyAuthLogin = async (e) => {
    e.preventDefault();
    if (!licenseKey.trim()) {
      showToast('Lütfen KeyAuth lisans anahtarınızı girin.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifyLicenseKey(licenseKey);
      if (res.success) {
        setIsAuthenticated(true);
        showToast(res.message || 'KeyAuth doğrulaması başarılı! Hoş geldiniz.', 'success');
      } else {
        showToast(res.message || 'Geçersiz lisans anahtarı.', 'error');
      }
    } catch (err) {
      showToast('KeyAuth bağlantı hatası oluştu.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setLicenseKey('');
    showToast('Admin oturumu güvenle kapatıldı.', 'info');
  };

  // Submit Ceza Log
  const handleSendCezaLog = async (e) => {
    e.preventDefault();
    if (!cezaForm.cezalandirilan || !cezaForm.yetkili || !cezaForm.sebep) {
      showToast('Lütfen cezalandırılan oyuncu, yetkili ve sebep alanlarını doldurun.', 'error');
      return;
    }

    setIsSending(true);
    try {
      const res = await sendCezaLogWebhook(cezaForm);
      if (res.success) {
        showToast('Ceza kaydı Discord Webhook kanalına başarıyla gönderildi!', 'success');
        setCezaForm({
          sikayetEden: '',
          cezalandirilan: '',
          yetkili: cezaForm.yetkili, // Yetkili adını kolaylık olsun diye tut
          sure: '3 Gün',
          sebep: '',
          kanit: ''
        });
      } else {
        showToast(res.message, 'error');
      }
    } finally {
      setIsSending(false);
    }
  };

  // Submit Hile Kontrol
  const handleSendHileKontrol = async (e) => {
    e.preventDefault();
    if (!hileForm.supheliOyuncu || !hileForm.cagiranYetkili || !hileForm.supheSebebi) {
      showToast('Lütfen şüpheli oyuncu, yetkili ve şüphe sebebi alanlarını doldurun.', 'error');
      return;
    }

    setIsSending(true);
    try {
      const res = await sendHileKontrolWebhook(hileForm);
      if (res.success) {
        showToast('Acil Hile Kontrol Çağrısı Discord kanalına fırlatıldı!', 'success');
        setHileForm({
          supheliOyuncu: '',
          cagiranYetkili: hileForm.cagiranYetkili,
          supheSebebi: '',
          sure: '5 Dakika',
          sesliOda: 'Hile Kontrol Bekleme Odası 1'
        });
      } else {
        showToast(res.message, 'error');
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] flex flex-col items-center justify-center p-4 relative selection:bg-purple-500/20 selection:text-purple-700">
      
      {/* Top Floating Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 text-xs font-bold text-slate-700 hover:text-black transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Siteye Dön</span>
        </button>
      </div>

      {/* 1. KEYAUTH LICENSE LOGIN SCREEN */}
      {!isAuthenticated ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center relative overflow-hidden"
        >
          {/* Top KeyAuth Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold font-mono mb-6">
            <Key className="w-3.5 h-3.5 text-purple-600" />
            <span>KeyAuth v1.0 • App: retroac</span>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-md shadow-purple-500/20 mb-4">
            <Crown className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-[#1d1d1f] mb-1">
            Yetkili Yönetim Portalı
          </h2>
          <p className="text-xs text-slate-500 mb-8">
            Retro Roleplay V1 yetkili lisans anahtarınızı girerek oturum açın.
          </p>

          <form onSubmit={handleKeyAuthLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono">
                Lisans Anahtarı (License Key)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="RETRO-XXXX-XXXX-XXXX"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white focus:outline-none text-[#1d1d1f] font-mono text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>KeyAuth Doğrulanıyor...</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Panele Giriş Yap</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>KeyAuth API 1.2 korumalı güvenli oturum.</span>
          </div>
        </motion.div>
      ) : (

        /* 2. AUTHENTICATED ADMIN DASHBOARD */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden mt-12 mb-8"
        >
          {/* Admin Header */}
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#1d1d1f]">Yetkili Kontrol Masası</h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Lisans Aktif
                  </span>
                </div>
                <p className="text-xs text-slate-500">Retro Roleplay V1 • Discord Webhook Yönetim Sistemi</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="px-6 py-3 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
            <button
              onClick={() => setActiveTab('cezalog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'cezalog'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-black'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Ceza Logu Bildirimi</span>
            </button>

            <button
              onClick={() => setActiveTab('hilekontrol')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'hilekontrol'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-black'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Hile Kontrol Çağırma</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* TAB 1: CEZA LOGLARI */}
            {activeTab === 'cezalog' && (
              <form onSubmit={handleSendCezaLog} className="space-y-5">
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs text-rose-900 leading-relaxed">
                  <strong>Ceza Log Şablonu:</strong> Bu formu doldurduğunuzda Discord ceza logları kanalına resmi formatta şık bir bildirim embed'i gönderilecektir.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Şikayet Eden Oyuncu
                    </label>
                    <input
                      type="text"
                      value={cezaForm.sikayetEden}
                      onChange={(e) => setCezaForm({ ...cezaForm, sikayetEden: e.target.value })}
                      placeholder="Örn: Arthur_Morgan (veya 'Yetkili Tespiti')"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white text-xs text-[#1d1d1f] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cezalandırılan Oyuncu *
                    </label>
                    <input
                      type="text"
                      value={cezaForm.cezalandirilan}
                      onChange={(e) => setCezaForm({ ...cezaForm, cezalandirilan: e.target.value })}
                      placeholder="Örn: John_Marston (ID: 42)"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white text-xs text-[#1d1d1f] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cezalandıran Yetkili *
                    </label>
                    <input
                      type="text"
                      value={cezaForm.yetkili}
                      onChange={(e) => setCezaForm({ ...cezaForm, yetkili: e.target.value })}
                      placeholder="Yetkili Nickiniz (Örn: Efe / Admin)"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white text-xs text-[#1d1d1f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ceza Süresi *
                    </label>
                    <input
                      type="text"
                      value={cezaForm.sure}
                      onChange={(e) => setCezaForm({ ...cezaForm, sure: e.target.value })}
                      placeholder="Örn: 60 Dakika / 3 Gün / Kalıcı (Perma)"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white text-xs text-[#1d1d1f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ceza Sebebi *
                  </label>
                  <textarea
                    rows={3}
                    value={cezaForm.sebep}
                    onChange={(e) => setCezaForm({ ...cezaForm, sebep: e.target.value })}
                    placeholder="Ceza verilme gerekçesini ayrıntılı yazınız (Örn: Madde 4 Powergaming ihlali ve çatışmada rol bölme)"
                    required
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white text-xs text-[#1d1d1f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kanıt / Video Linki (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={cezaForm.kanit}
                    onChange={(e) => setCezaForm({ ...cezaForm, kanit: e.target.value })}
                    placeholder="https://streamable.com/... veya https://youtu.be/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white text-xs text-[#1d1d1f]"
                  />
                </div>

                {/* Discord Embed Canlı Görünüm Önizleme */}
                <div className="mt-6 p-4 rounded-2xl bg-[#1e1f22] border border-[#2b2d31] text-[#dbdee1] font-sans shadow-inner">
                  <div className="flex items-center justify-between mb-3 text-[11px] text-slate-400 font-mono border-b border-white/5 pb-2">
                    <span className="flex items-center gap-1.5 font-bold text-slate-300">
                      <Eye className="w-3.5 h-3.5 text-rose-400" />
                      Discord Ceza Logu Canlı Önizleme (Kalın & Zengin Embed)
                    </span>
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                      Canlı Simülasyon
                    </span>
                  </div>

                  {/* Simulated Discord Embed */}
                  <div className="p-4 rounded-xl bg-[#2b2d31] border-l-4 border-[#dc2626] shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-[11px] font-bold text-white/80">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/9422/9422956.png" 
                        alt="icon" 
                        className="w-4 h-4 rounded-full" 
                      />
                      <span>RETRO ROLEPLAY V1 • RESMİ ADMİNİSTRASYON HEYETİ</span>
                    </div>

                    <h4 className="text-sm font-extrabold text-white mb-2 tracking-tight">
                      ⚖️ RESMİ CEZA VE DİSİPLİN YAPTIRIM KAYDI
                    </h4>

                    <div className="text-[11px] text-slate-300 mb-3 bg-black/30 p-2.5 rounded-lg border border-white/5 font-mono leading-relaxed">
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br />
                      <span className="text-white font-bold">📌 KURAL İHLALİ VE DİSİPLİN İŞLEMİ</span><br />
                      <span className="text-slate-400">&gt; Sunucu kurallarına aykırı davranış sergileyen oyuncuya resmi yaptırım uygulanmıştır.</span><br />
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      <div className="bg-[#1e1f22] p-2.5 rounded-lg border border-white/5">
                        <div className="text-[10px] font-black text-slate-400 mb-0.5">👤 ŞİKAYET EDEN</div>
                        <div className="font-mono font-bold text-emerald-400">&gt; ➔ `{cezaForm.sikayetEden || 'Yetkili Tespiti / Şikayetsiz'}`</div>
                      </div>
                      <div className="bg-[#1e1f22] p-2.5 rounded-lg border border-white/5">
                        <div className="text-[10px] font-black text-slate-400 mb-0.5">🚫 CEZALANDIRILAN OYUNCU</div>
                        <div className="font-mono font-bold text-rose-400">&gt; ➔ `{cezaForm.cezalandirilan || 'Oyuncu Adı (ID)'}`</div>
                      </div>
                      <div className="bg-[#1e1f22] p-2.5 rounded-lg border border-white/5">
                        <div className="text-[10px] font-black text-slate-400 mb-0.5">🛡️ CEZALANDIRAN YETKİLİ</div>
                        <div className="font-mono font-bold text-blue-400">&gt; ➔ `{cezaForm.yetkili || 'Yetkili Ekibi'}`</div>
                      </div>
                      <div className="bg-[#1e1f22] p-2.5 rounded-lg border border-white/5">
                        <div className="text-[10px] font-black text-slate-400 mb-0.5">⏳ CEZA SÜRESİ & TÜRÜ</div>
                        <div className="font-mono font-bold text-amber-400">&gt; ➔ `{cezaForm.sure || '3 Gün'}`</div>
                      </div>
                      <div className="sm:col-span-2 bg-[#1e1f22] p-2.5 rounded-lg border border-white/5">
                        <div className="text-[10px] font-black text-slate-400 mb-1">📝 CEZA SEBEBİ / GEREKÇE (KOD BLOĞU)</div>
                        <pre className="text-amber-300 bg-black/40 p-2 rounded font-mono text-[11px] whitespace-pre-wrap">{cezaForm.sebep || 'Gerekçe ve kural ihlali detayı...'}</pre>
                      </div>
                      {cezaForm.kanit && (
                        <div className="sm:col-span-2 bg-[#1e1f22] p-2.5 rounded-lg border border-white/5">
                          <div className="text-[10px] font-black text-slate-400 mb-0.5">🔗 RESMİ KANIT / BAĞLANTI</div>
                          <div className="font-mono text-cyan-400 text-[11px] underline truncate">{cezaForm.kanit}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/5 font-mono">
                      <span>Retro Roleplay V1 • Disiplin ve Ceza Sicil Sistemi • RetroGuard</span>
                      <span>Şimdi (Discord Embed)</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-black text-sm shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Webhook Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Ceza Bildirimini Discord'a Gönder</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: HİLE KONTROL ÇAĞIRMA */}
            {activeTab === 'hilekontrol' && (
              <form onSubmit={handleSendHileKontrol} className="space-y-5">
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed">
                  <strong>Acil Çağrı Sistemi:</strong> Şüpheli oyuncuyu screenshare / hile kontrol odasına çağırmak için bu formu kullanın. Discord kanalında @everyone etiketiyle uyarı oluşturulur.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Şüpheli Oyuncu (Nick / ID) *
                    </label>
                    <input
                      type="text"
                      value={hileForm.supheliOyuncu}
                      onChange={(e) => setHileForm({ ...hileForm, supheliOyuncu: e.target.value })}
                      placeholder="Örn: Speed_Demon (ID: 15)"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-xs text-[#1d1d1f] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Çağıran Yetkili *
                    </label>
                    <input
                      type="text"
                      value={hileForm.cagiranYetkili}
                      onChange={(e) => setHileForm({ ...hileForm, cagiranYetkili: e.target.value })}
                      placeholder="Yetkili Nickiniz"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-xs text-[#1d1d1f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Giriş Yapılması Gereken Sesli Oda
                    </label>
                    <input
                      type="text"
                      value={hileForm.sesliOda}
                      onChange={(e) => setHileForm({ ...hileForm, sesliOda: e.target.value })}
                      placeholder="Örn: Hile Kontrol Bekleme Odası 1"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-xs text-[#1d1d1f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Verilen Süre
                    </label>
                    <input
                      type="text"
                      value={hileForm.sure}
                      onChange={(e) => setHileForm({ ...hileForm, sure: e.target.value })}
                      placeholder="Örn: 5 Dakika"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-xs text-[#1d1d1f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Şüphe / İnceleme Sebebi *
                  </label>
                  <textarea
                    rows={3}
                    value={hileForm.supheSebebi}
                    onChange={(e) => setHileForm({ ...hileForm, supheSebebi: e.target.value })}
                    placeholder="Şüphe duyulan hareketleri yazın (Örn: Çatışmada sekme olmaksızın 4 vuruş üst üste isabet, anormal araç hızı tespiti)"
                    required
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-xs text-[#1d1d1f]"
                  />
                </div>

                {/* Discord Embed Canlı Görünüm Önizleme */}
                <div className="mt-6 p-4 rounded-2xl bg-[#1e1f22] border border-[#2b2d31] text-[#dbdee1] font-sans shadow-inner">
                  <div className="flex items-center justify-between mb-3 text-[11px] text-slate-400 font-mono border-b border-white/5 pb-2">
                    <span className="flex items-center gap-1.5 font-bold text-slate-300">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      Discord Hile Kontrol Çağrısı Canlı Önizleme (Kalın & Zengin Embed)
                    </span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                      Canlı Simülasyon
                    </span>
                  </div>

                  {/* Simulated Discord Embed */}
                  <div className="p-4 rounded-xl bg-[#2b2d31] border-l-4 border-[#ff3b30] shadow-sm">
                    <div className="text-[11px] text-amber-400 font-bold mb-2 font-mono">
                      🚨 [ACİL ÇAĞRI] `{hileForm.supheliOyuncu || 'Şüpheli'}` hile kontrolüne çağrılmıştır! @everyone
                    </div>

                    <div className="flex items-center gap-2 mb-2 text-[11px] font-bold text-white/80">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/564/564619.png" 
                        alt="icon" 
                        className="w-4 h-4 rounded-full" 
                      />
                      <span>RETROGUARD SHIELD • HİLE VE GÜVENLİK BİRİMİ</span>
                    </div>

                    <h4 className="text-sm font-extrabold text-white mb-2 tracking-tight">
                      🚨 RETROGUARD • ACİL HİLE KONTROL VE SCREENSHARE ÇAĞRISI
                    </h4>

                    <div className="text-[11px] text-slate-300 mb-3 bg-black/30 p-2.5 rounded-lg border border-white/5 font-mono leading-relaxed">
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br />
                      <span className="text-white font-bold">⚠️ DİKKAT: ŞÜPHELİ YAZILIM / OYUNCU İNCELEMESİ</span><br />
                      <span className="text-slate-400">&gt; Aşağıda belirtilen oyuncunun şüpheli hareketleri tespit edilmiş olup derhal sesli kanala katılması zorunludur!</span><br />
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      <div className="bg-[#1e1f22] p-2.5 rounded-lg border border-white/5">
                        <div className="text-[10px] font-black text-slate-400 mb-0.5">🎯 ŞÜPHELİ OYUNCU</div>
                        <div className="font-mono font-bold text-rose-400">&gt; ➔ `{hileForm.supheliOyuncu || 'Şüpheli Oyuncu'}`</div>
                      </div>
                      <div className="bg-[#1e1f22] p-2.5 rounded-lg border border-white/5">
                        <div className="text-[10px] font-black text-slate-400 mb-0.5">👮 ÇAĞIRAN YETKİLİ</div>
                        <div className="font-mono font-bold text-blue-400">&gt; ➔ `{hileForm.cagiranYetkili || 'Yetkili Ekibi'}`</div>
                      </div>
                      <div className="bg-[#1e1f22] p-2.5 rounded-lg border border-white/5">
                        <div className="text-[10px] font-black text-slate-400 mb-0.5">⏱️ VERİLEN SÜRE</div>
                        <div className="font-mono font-bold text-amber-400">&gt; ⏰ `{hileForm.sure || '5 Dakika'}` (Gecikme tolere edilmez)</div>
                      </div>
                      <div className="bg-[#1e1f22] p-2.5 rounded-lg border border-white/5">
                        <div className="text-[10px] font-black text-slate-400 mb-0.5">🔊 BEKLENEN SESLİ ODA</div>
                        <div className="font-mono font-bold text-emerald-400">&gt; 🎙️ `{hileForm.sesliOda || 'Hile Kontrol Bekleme Odası 1'}`</div>
                      </div>
                      <div className="sm:col-span-2 bg-[#1e1f22] p-2.5 rounded-lg border border-white/5">
                        <div className="text-[10px] font-black text-slate-400 mb-1">🔍 İNCELEME & ŞÜPHE GEREKÇESİ</div>
                        <pre className="text-yellow-300 bg-black/40 p-2 rounded font-mono text-[11px] whitespace-pre-wrap">{hileForm.supheSebebi || 'Tespit edilen şüpheli hareketler...'}</pre>
                      </div>
                      <div className="sm:col-span-2 bg-[#1e1f22] p-2.5 rounded-lg border border-white/5 text-[11px] text-rose-300">
                        <div className="text-[10px] font-black text-slate-400 mb-0.5">🛑 PROTOKOL VE YAPTIRIM UYARISI</div>
                        <p className="font-semibold leading-relaxed">
                          ❗ 1. Verilen süre içerisinde odaya katılmayan oyuncu doğrudan <strong>KALICI OLARAK UZAKLAŞTIRILIR (Perma Ban)</strong>.<br />
                          ❗ 2. Kontrol esnasında oyundan çıkmak veya reddetmek itiraf sayılır.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/5 font-mono">
                      <span>Retro Roleplay V1 • RetroGuard Hile Kontrol ve Güvenlik Sistemi</span>
                      <span>Şimdi (Discord Embed)</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-black text-sm shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Çağrı Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Radio className="w-4 h-4" />
                      <span>Acil Hile Kontrol Çağrısını Discord'a Gönder</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      )}

    </div>
  );
}
