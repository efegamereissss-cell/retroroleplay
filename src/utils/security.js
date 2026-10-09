/**
 * Retro Roleplay V1 - Client-Side Security & Validation Utilities
 * 
 * Bu yardımcı modül form verilerinin istemci tarafında temizlenmesi (sanitization),
 * şifre entropi analizi ve XSS önleme mekanizmalarını içerir.
 */

// Basit ve etkili XSS temizleyici (Cross-Site Scripting Injection Defense)
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Güvenli şifre gücü ve entropi hesaplayıcı
export function evaluatePasswordStrength(password) {
  if (!password) {
    return { score: 0, label: 'Girilmedi', color: 'bg-zinc-700', feedback: [] };
  }

  let score = 0;
  const feedback = [];

  // 1. Uzunluk kontrolü
  if (password.length >= 8) score += 1;
  else feedback.push('En az 8 karakter olmalı');

  if (password.length >= 12) score += 1;

  // 2. Küçük ve Büyük harf kontrolü
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Büyük ve küçük harf içermeli');
  }

  // 3. Rakam kontrolü
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('En az 1 rakam içermeli');
  }

  // 4. Özel karakter kontrolü
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push('En az 1 özel sembol (!@#$% vb.) içermeli');
  }

  // Puanlandırma seviyeleri
  if (score <= 1) {
    return { score: 20, level: 1, label: 'Çok Zayıf', color: 'bg-rose-500', feedback };
  } else if (score === 2) {
    return { score: 40, level: 2, label: 'Zayıf', color: 'bg-amber-500', feedback };
  } else if (score === 3) {
    return { score: 65, level: 3, label: 'Orta Düzey', color: 'bg-yellow-400', feedback };
  } else if (score === 4) {
    return { score: 85, level: 4, label: 'Güçlü', color: 'bg-cyan-400', feedback };
  } else {
    return { score: 100, level: 5, label: 'Üst Düzey Güvenli', color: 'bg-emerald-400', feedback: ['Şifreniz Hard RP standartlarına uygun ve üst düzey korumalı!'] };
  }
}

// MTA Karakter Adı Format Doğrulayıcı (Ad_Soyad formatı)
export function validateCharacterName(name) {
  const regex = /^[A-Z][a-z]+_[A-Z][a-z]+$/;
  return regex.test(name);
}

// Sahte TOTP 2FA Doğrulama Kodu Üretici (Demo amaçlı 6 haneli kod)
export function generateDemoTotpToken() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
