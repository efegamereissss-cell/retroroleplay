import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Varsayılan olarak aktif ve kayıtlı kullanıcı profili
  const defaultRegisteredUser = {
    id: 'RETRO-8941',
    username: 'Arthur_Morgan',
    email: 'arthur@retrorp.com',
    characterName: 'Arthur_Morgan',
    role: 'Kayıtlı Oyuncu (Aktif)',
    cash: 12500,
    bank: 84200,
    playTime: '148 Saat',
    twoFactorEnabled: true,
    registeredAt: 'Aktif Oyuncu',
    characters: [
      { name: 'Arthur_Morgan', level: 12, job: 'LSPD Dedektif', status: 'Aktif' },
      { name: 'Marcus_Vance', level: 6, job: 'Sivil / Mekanik', status: 'Aktif' },
    ],
    vehicles: [
      { model: 'Declasse Sabre Turbo', plate: '34 RRP 86', status: 'Garajda' },
      { model: 'Bravado Buffalo S', plate: '06 LPD 01', status: 'Garajda' },
    ],
    securityLogs: [
      { ip: '45.143.11.113', date: 'Bugün 15:42', device: 'Windows 11 (VDS Aktif)', status: 'Başarılı' },
    ],
  };

  const [user, setUser] = useState(defaultRegisteredUser);
  const [authToken, setAuthToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.retro_simulated_token');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
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

  // Giriş Yap fonksiyonu
  const login = async (username, password, rememberMe = false) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const loggedUser = {
      ...defaultRegisteredUser,
      username: username || 'Arthur_Morgan',
      characterName: username.includes('_') ? username : 'Arthur_Morgan',
    };

    completeLogin(loggedUser, rememberMe);
    return { success: true };
  };

  // 2FA Tamamlama
  const verify2Fa = async (code) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (code.length === 6) {
      completeLogin(defaultRegisteredUser, true);
      setIs2FaPending(false);
      showToast('2FA Doğrulaması Başarılı! Hoş geldiniz.', 'success');
      return true;
    } else {
      showToast('Hatalı 2FA kodu.', 'error');
      return false;
    }
  };

  const completeLogin = (userData, remember = false) => {
    setUser(userData);
    setAuthToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.retro_simulated_secure_token');
    setIsAuthModalOpen(false);
    showToast(`Oturum aktif: ${userData.username}`, 'success');
  };

  // Kayıt Ol fonksiyonu (Whitelist yok - anında aktif hesap)
  const register = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const newUser = {
      id: `RETRO-${Math.floor(1000 + Math.random() * 9000)}`,
      username: formData.username,
      email: formData.email,
      characterName: formData.characterName,
      role: 'Kayıtlı Oyuncu (Aktif)',
      cash: 5000,
      bank: 15000,
      playTime: '0 Saat',
      twoFactorEnabled: false,
      registeredAt: new Date().toLocaleDateString('tr-TR'),
      characters: [
        { name: formData.characterName, level: 1, job: 'Vatandaş', status: 'Aktif' },
      ],
      vehicles: [],
      securityLogs: [
        { ip: '45.143.11.113', date: 'Şimdi', device: 'Web Tarayıcı', status: 'Kayıt Yapıldı' },
      ],
    };

    completeLogin(newUser, true);
    showToast('Hesabınız oluşturuldu ve oyuna giriş için aktif edildi!', 'success');
    return { success: true };
  };

  // Çıkış Yap
  const logout = () => {
    setUser(null);
    setAuthToken(null);
    showToast('Oturum sonlandırıldı.', 'info');
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
