/**
 * RETRO ROLEPLAY V1 - BACKEND GÜVENLİK VE SAVUNMA KATMANI
 * 
 * Bu middleware dosyası gelen tüm HTTP isteklerini analiz eder:
 * 1. SQL Injection (CWE-89) Heuristik Tespiti
 * 2. Cross-Site Scripting (XSS - CWE-79) Giriş Sanitizasyonu
 * 3. Cross-Site Request Forgery (CSRF - CWE-352) Token Denetimi
 * 4. JWT Bearer Token Doğrulaması (RFC 7519)
 */

import jwt from 'jsonwebtoken';

// Basit XSS & SQLi tehlikeli karakter filtreleme
export function sanitizeRequestData(req, res, next) {
  const sanitize = (val) => {
    if (typeof val === 'string') {
      // Tehlikeli HTML etiketlerini ve script yürütücüleri arındır
      return val
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+="[^"]*"/gi, '')
        .replace(/javascript:/gi, '')
        .trim();
    } else if (typeof val === 'object' && val !== null) {
      for (const key of Object.keys(val)) {
        val[key] = sanitize(val[key]);
      }
    }
    return val;
  };

  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  if (req.params) req.params = sanitize(req.params);

  next();
}

// Şüpheli SQL Injection Desen Tespiti (Ekstra WAF Katmanı)
export function sqlInjectionGuard(req, res, next) {
  const sqliPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
    /\w*((\%27)|(\'))(\s)*((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
    /(union([\s\S]*?)select)/i,
    /(select([\s\S]*?)from)/i,
    /(drop([\s\S]+?)table)/i
  ];

  const checkValue = (val) => {
    if (typeof val === 'string') {
      return sqliPatterns.some((pattern) => pattern.test(val));
    }
    if (typeof val === 'object' && val !== null) {
      return Object.values(val).some(checkValue);
    }
    return false;
  };

  const suspicious = checkValue(req.body) || checkValue(req.query);

  if (suspicious) {
    console.warn(`[GÜVENLİK UYARISI] Potansiyel SQL Injection denemesi engellendi! IP: ${req.ip}`);
    return res.status(403).json({
      success: false,
      error: 'Güvenlik Protokolü: İsteğiniz şüpheli karakter dizisi içerdiği için reddedildi.'
    });
  }

  next();
}

// JWT Token Doğrulama Middleware'i
export function verifyJwtToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Yetkilendirme Hatası: Erişim belirteci (Access Token) bulunamadı.'
    });
  }

  const secret = process.env.JWT_ACCESS_SECRET || 'retro_roleplay_v1_super_secure_jwt_secret_key_2026';

  jwt.verify(token, secret, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Geçersiz veya süresi dolmuş oturum belirteci. Lütfen tekrar giriş yapın.'
      });
    }

    req.user = decodedUser;
    next();
  });
}

// CSRF Çift Gönderim Token Denetimi (SameSite çerezlerin yanında ikinci koruma kalkanı)
export function verifyCsrfToken(req, res, next) {
  // Sadece durum değiştiren istekleri (POST, PUT, DELETE) denetle
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const clientCsrfToken = req.headers['x-csrf-token'];
  const cookieCsrfToken = req.cookies ? req.cookies['retro_csrf'] : null;

  if (!clientCsrfToken || !cookieCsrfToken || clientCsrfToken !== cookieCsrfToken) {
    return res.status(403).json({
      success: false,
      error: 'CSRF Güvenlik Hatası: Geçersiz veya eksik anti-CSRF belirteci.'
    });
  }

  next();
}
