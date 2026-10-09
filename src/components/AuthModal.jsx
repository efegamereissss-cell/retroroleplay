import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Lock, 
  User, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Key, 
  Smartphone, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { evaluatePasswordStrength, sanitizeInput, validateCharacterName } from '../utils/security';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    login, 
    verify2Fa, 
    register,
    showToast 
  } = useAuth();

  // Login form state
  const [loginUsername, setLoginUsername] = useState('Arthur_Morgan');
  const [loginPassword, setLoginPassword] = useState('RetroHardRp@2026');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCharName, setRegCharName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [acceptRules, setAcceptRules] = useState(false);

  // 2FA state
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);

  // Password strength calculation
  const pwdStrength = evaluatePasswordStrength(regPassword);

  // 2FA countdown timer
  useEffect(() => {
    let interval;
    if (authModalTab === '2fa') {
      interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 1 ? prev - 1 : 30));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authModalTab]);

  if (!isAuthModalOpen) return null;

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const sanitizedUser = sanitizeInput(loginUsername.trim());
    if (!sanitizedUser || !loginPassword) {
      showToast('Lütfen kullanıcı adı ve şifrenizi girin.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(sanitizedUser, loginPassword, rememberMe);
    } catch (err) {
      showToast('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regUsername || !regEmail || !regCharName || !regPassword) {
      showToast('Lütfen tüm zorunlu alanları doldurun.', 'error');
      return;
    }

    // Validate Character Name format (Ad_Soyad)
    if (!validateCharacterName(regCharName)) {
      showToast('Karakter adı "Ad_Soyad" formatında olmalıdır (Örn: Thomas_Shelby)', 'error');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      showToast('Girdiğiniz şifreler birbiriyle uyuşmuyor.', 'error');
      return;
    }

    if (pwdStrength.score < 60) {
      showToast('Güvenliğiniz için lütfen daha güçlü bir şifre belirleyin.', 'error');
      return;
    }

    if (!acceptRules) {
      showToast('Lütfen sunucu Hard RP kurallarını kabul edin.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        username: sanitizeInput(regUsername.trim()),
        email: sanitizeInput(regEmail.trim()),
        characterName: sanitizeInput(regCharName.trim()),
        password: regPassword,
      });
    } catch (err) {
      showToast('Kayıt oluşturulurken bir hata meydana geldi.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP digit change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify2FaSubmit = async (e) => {
    e.preventDefault();
    const fullCode = otpCode.join('');
    if (fullCode.length !== 6) {
      showToast('Lütfen 6 haneli 2FA kodunun tamamını girin.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await verify2Fa(fullCode);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsAuthModalOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg rounded-3xl glass-panel border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8 backdrop-blur-3xl"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Tabs */}
        {authModalTab !== '2fa' ? (
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/5 mb-6">
            <button
              onClick={() => setAuthModalTab('login')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                authModalTab === 'login'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => setAuthModalTab('register')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                authModalTab === 'register'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kayıt Ol (UCP)
            </button>
          </div>
        ) : (
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-3">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">İki Faktörlü Doğrulama (2FA)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Google Authenticator / Authy uygulamanızdaki 6 haneli kodu girin.
            </p>
          </div>
        )}

        {/* Tab 1: LOGIN FORM */}
        {authModalTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Kullanıcı Adı veya E-posta
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Kullanıcı adınız"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Şifre
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0"
                />
                <span>Beni Hatırla</span>
              </label>
              <a
                href="#security"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Şifre sıfırlama için Discord destek talebi açınız.', 'info');
                }}
                className="text-cyan-400 hover:underline"
              >
                Şifremi Unuttum?
              </a>
            </div>

            {/* SQL Injection & CSRF Security badge */}
            <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-2.5 text-[11px] text-emerald-300">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Prepared Statement & CSRF Token korumalı güvenli oturum.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Doğrulanıyor...</span>
                </>
              ) : (
                <>
                  <span>Giriş Yap</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 2: REGISTER FORM */}
        {authModalTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Kullanıcı Adı (UCP Girişi İçin)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="Kullanıcı Adı"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="ornek@domain.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-300">
                  İlk Karakter Adı
                </label>
                <span className="text-[10px] text-cyan-400 font-mono">Format: Ad_Soyad</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={regCharName}
                  onChange={(e) => setRegCharName(e.target.value)}
                  placeholder="Örn: Arthur_Shelby"
                  required
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs font-mono transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Şifre
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="En az 8 karakter, sembol ve büyük harf"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Entropy Meter */}
              {regPassword && (
                <div className="mt-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Şifre Güvenlik Düzeyi:</span>
                    <span className="font-bold text-white">{pwdStrength.label}</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${pwdStrength.color} transition-all duration-300`}
                      style={{ width: `${pwdStrength.score}%` }}
                    />
                  </div>
                  {pwdStrength.feedback.length > 0 && (
                    <div className="text-[10px] text-amber-300/80">
                      {pwdStrength.feedback.join(' • ')}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Şifre Tekrarı
              </label>
              <input
                type="password"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                placeholder="Şifrenizi doğrulayın"
                required
                className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs transition-all"
              />
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={acceptRules}
                  onChange={(e) => setAcceptRules(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0"
                />
                <span>
                  Retro Roleplay V1 Hard RP kurallarını (FearRP, CK, PK vb.) okudum, anladım ve kabul ediyorum.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Kayıt Oluşturuluyor...</span>
                </>
              ) : (
                <>
                  <span>Kayıt Ol ve Başvuruyu Tamamla</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 3: 2FA TOTP VERIFICATION */}
        {authModalTab === '2fa' && (
          <form onSubmit={handleVerify2FaSubmit} className="space-y-6">
            
            {/* Visual QR Code & Secret Simulation */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-4">
              {/* Mock QR SVG */}
              <div className="w-20 h-20 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center shadow">
                <div className="grid grid-cols-5 gap-1 w-full h-full p-1 bg-black rounded">
                  <div className="bg-white col-span-2 row-span-2"></div>
                  <div className="bg-white col-span-1"></div>
                  <div className="bg-white col-span-2 row-span-2"></div>
                  <div className="bg-white col-span-1"></div>
                  <div className="bg-white col-span-3"></div>
                  <div className="bg-white col-span-2 row-span-2"></div>
                  <div className="bg-white col-span-1"></div>
                  <div className="bg-white col-span-2 row-span-2"></div>
                </div>
              </div>

              <div className="flex-1 text-left">
                <div className="text-xs font-semibold text-slate-300">Gizli Anahtar (Secret):</div>
                <div className="text-xs font-mono text-cyan-300 font-bold tracking-wider mt-0.5 select-all">
                  RETRO-V1-9482-TOTP
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Kalan Yenilenme Süresi: <span className="text-amber-400 font-bold font-mono">{otpTimer}s</span>
                </div>
              </div>
            </div>

            {/* 6 Digit Input Boxes */}
            <div>
              <div className="flex justify-center gap-2 sm:gap-3">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 sm:w-12 h-14 text-center text-xl font-bold font-mono text-white bg-white/[0.05] border border-white/15 rounded-2xl focus:border-cyan-400 focus:outline-none shadow-inner"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Kod gelmedi mi?</span>
              <button
                type="button"
                onClick={() => {
                  setOtpCode(['8', '9', '4', '1', '2', '0']);
                  showToast('Demo 2FA kodu dolduruldu: 894120', 'info');
                }}
                className="text-cyan-400 hover:underline font-medium"
              >
                Demo Kodu Otomatik Doldur
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Doğrulanıyor...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>2FA Doğrula ve Panele Gir</span>
                </>
              )}
            </button>
          </form>
        )}

      </motion.div>
    </div>
  );
}
