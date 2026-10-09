import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register' | '2fa'
  const [is2FaPending, setIs2FaPending] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast bildirim tetikleyici
  const showToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  // Simüle edilmiş başlangıç oturum kontrolü
  useEffect(() => {
    const storedSession = localStorage.getItem('retro_session_user');
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        setUser(parsed);
        setAuthToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.retro_simulated_token');
      } catch (e) {
        console.error('Session parse error', e);
      }
    }
  }, []);

  // Giriş Yap fonksiyonu
  const login = async (username, password, rememberMe = false) => {
    // Gerçek dünyada backend API'ye güvenli HTTPS POST gönderilir
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Demo kullanıcı bilgileri
    const mockUser = {
      id: 'RETRO-8941',
      username: username || 'Arthur_Morgan',
      email: `${(username || 'retro_player').toLowerCase()}@domain.com`,
      characterName: username.includes('_') ? username : 'Alexander_Pierce',
      role: 'Oyuncu (Whitelist Onaylı)',
      cash: 12500,
      bank: 84200,
      playTime: '148 Saat',
      twoFactorEnabled: true,
      registeredAt: '14.02.2026',
      characters: [
        { name: 'Alexander_Pierce', level: 12, job: 'LSPD Dedektif', status: 'Aktif' },
        { name: 'Marcus_Vance', level: 6, job: 'Sivil / Mekanik', status: 'Pasif' },
      ],
      vehicles: [
        { model: 'Declasse Sabre Turbo', plate: '34 RRP 86', status: 'Garajda' },
        { model: 'Bravado Buffalo S', plate: '06 LPD 01', status: 'Bağlı' },
      ],
      securityLogs: [
        { ip: '45.143.11.113', date: 'Bugün 15:42', device: 'Windows 11 (Chrome 128)', status: 'Başarılı' },
        { ip: '185.12.98.4', date: 'Dün 21:10', device: 'Windows 11 (Chrome 128)', status: 'Başarılı' },
      ],
    };

    // Eğer 2FA aktifse 2FA adımını aç
    if (mockUser.twoFactorEnabled) {
      setPendingUser(mockUser);
      setIs2FaPending(true);
      setAuthModalTab('2fa');
      showToast('2FA İki Faktörlü Doğrulama kodu bekleniyor...', 'info');
      return { require2Fa: true };
    }

    completeLogin(mockUser, rememberMe);
    return { success: true };
  };

  // 2FA Tamamlama
  const verify2Fa = async (code) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (code.length === 6) {
      if (pendingUser) {
        completeLogin(pendingUser, true);
        setIs2FaPending(false);
        setPendingUser(null);
        showToast('2FA Güvenlik Doğrulaması Başarılı! Hoş geldiniz.', 'success');
        return true;
      }
    } else {
      showToast('Hatalı 2FA kodu. Lütfen 6 haneli kodu kontrol edin.', 'error');
      return false;
    }
  };

  const completeLogin = (userData, remember = false) => {
    setUser(userData);
    const mockJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.retro_simulated_secure_token';
    setAuthToken(mockJwt);
    if (remember) {
      localStorage.setItem('retro_session_user', JSON.stringify(userData));
    }
    setIsAuthModalOpen(false);
    showToast(`Oturum açıldı: ${userData.username}`, 'success');
  };

  // Kayıt Ol fonksiyonu
  const register = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newUser = {
      id: `RETRO-${Math.floor(1000 + Math.random() * 9000)}`,
      username: formData.username,
      email: formData.email,
      characterName: formData.characterName,
      role: 'Başvuru Beklemede (Whitelist İncelemede)',
      cash: 5000,
      bank: 15000,
      playTime: '0 Saat (Yeni Oyuncu)',
      twoFactorEnabled: false,
      registeredAt: new Date().toLocaleDateString('tr-TR'),
      characters: [
        { name: formData.characterName, level: 1, job: 'İşsiz / Vatandaş', status: 'Beklemede' },
      ],
      vehicles: [],
      securityLogs: [
        { ip: '45.143.11.113', date: 'Şimdi', device: 'Web Tarayıcı', status: 'Kayıt Yapıldı' },
      ],
    };

    completeLogin(newUser, true);
    showToast('Hesabınız ve Hard RP Karakter başvurunuz oluşturuldu!', 'success');
    return { success: true };
  };

  // Çıkış Yap
  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('retro_session_user');
    showToast('Oturum sonlandırıldı. Güvenli çıkış yapıldı.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        is2FaPending,
        login,
        verify2Fa,
        register,
        logout,
        toasts,
        showToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
