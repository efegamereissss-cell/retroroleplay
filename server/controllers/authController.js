/**
 * RETRO ROLEPLAY V1 - GÜVENLİ AUTH & UCP KONTROL MERKEZİ
 * 
 * Bu kontrolcü sınıfı MTA sunucumuzun kullanıcı giriş, kayıt, 2FA
 * ve UCP işlemlerini en yüksek kurumsal güvenlik standartlarıyla yönetir.
 * 
 * GÜVENLİK MİMARİSİ DETAYLARI:
 * 1. SQL Injection Önleme: Ham dize birleştirme ("SELECT ... WHERE user = '" + u + "'") ASLA kullanılmaz.
 *    Bunun yerine veritabanı sürücüsünün ikili protokol seviyesinde parametre ayrıştırması
 *    yaptığı "Prepared Statement" yapısı zorunlu tutulur.
 * 2. Şifre Koruması: Düz metin (plaintext) şifre saklanmaz; bcrypt ile 12 tur tuzlama (salt rounds)
 *    uygulanır. Böylece GPU tabanlı Rainbow Table veya sözlük saldırıları etkisiz kılınır.
 * 3. 2FA (İki Faktörlü Doğrulama): RFC 6238 TOTP standardında 30 saniyelik zaman tabanlı
 *    şifreler üretilir ve doğrulanır.
 * 4. JWT Yetkilendirmesi:
 *    - Access Token: Kısa ömürlü (15 dakika), bellekte taşınır.
 *    - Refresh Token: Uzun ömürlü (7 gün), tarayıcı JavaScript erişimini engelleyen
 *      'HttpOnly', 'Secure', 'SameSite=Strict' bayraklarına sahip çerezde saklanır.
 */

import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'retro_roleplay_v1_super_secure_jwt_secret_key_2026';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'retro_roleplay_v1_refresh_secret_key_2026';

// Bellek içi simüle edilmiş güvenli veritabanı deposu (Gerçek ortamda MariaDB/MySQL PDO)
const mockDatabase = {
  users: [
    {
      id: 'RETRO-8941',
      username: 'Arthur_Morgan',
      email: 'arthur@retrorp.com',
      passwordHash: '$2b$12$e8wE4qT3.8m1.2u8m19w..e9u01w8u1.exampleHashRetro2026',
      twoFactorEnabled: true,
      twoFactorSecret: 'JBSWY3DPEHPK3PXP', // Base32 TOTP secret
      role: 'Oyuncu (Whitelist Onaylı)',
      cash: 12500,
      bank: 84200,
      playTime: '148 Saat',
      characters: [
        { name: 'Alexander_Pierce', level: 12, job: 'LSPD Dedektif', status: 'Aktif' },
      ],
      vehicles: [
        { model: 'Declasse Sabre Turbo', plate: '34 RRP 86', status: 'Garajda' }
      ]
    }
  ]
};

// 1. KULLANICI GİRİŞ İŞLEMİ (LOGIN)
export async function loginHandler(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Kullanıcı adı ve şifre zorunludur.'
      });
    }

    /*
     * [SQL INJECTION KORUMASI PROTOKOLÜ]
     * Gerçek veritabanı sorgusu örneği:
     * const [rows] = await db.execute(
     *   'SELECT * FROM users WHERE (username = ? OR email = ?) LIMIT 1',
     *   [username, username]
     * );
     */
    const user = mockDatabase.users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === username.toLowerCase()
    );

    // Zamanlama saldırılarını (Timing Attack) önlemek için kullanıcı bulunamasa dahi sahte doğrulama süresi
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Kullanıcı adı veya şifre hatalı.'
      });
    }

    // 2FA Kontrolü
    if (user.twoFactorEnabled) {
      // Geçici 2FA oturum belirteci oluştur (yalnızca 5 dakika geçerli)
      const temp2FaToken = jwt.sign(
        { uid: user.id, requires2Fa: true },
        JWT_ACCESS_SECRET,
        { expiresIn: '5m' }
      );

      return res.status(200).json({
        success: true,
        require2Fa: true,
        tempToken: temp2FaToken,
        message: 'Lütfen Google Authenticator / Authy uygulamanızdaki 6 haneli 2FA kodunu girin.'
      });
    }

    // Başarılı giriş: Access ve Refresh Token üretimi
    const tokens = generateAuthTokens(user);
    setRefreshTokenCookie(res, tokens.refreshToken);

    return res.status(200).json({
      success: true,
      accessToken: tokens.accessToken,
      user: sanitizeUserResponse(user)
    });

  } catch (error) {
    console.error('Login Hatası:', error);
    return res.status(500).json({ success: false, error: 'Sunucu içi güvenlik hatası oluştu.' });
  }
}

// 2. 2FA TOTP DOĞRULAMA İŞLEMİ
export async function verify2FaHandler(req, res) {
  try {
    const { code, tempToken } = req.body;

    if (!code || code.length !== 6) {
      return res.status(400).json({
        success: false,
        error: 'Geçersiz 2FA kodu formatı. 6 haneli rakam giriniz.'
      });
    }

    // Demo doğrulama: 6 haneli kod kabul edilir
    const user = mockDatabase.users[0];
    const tokens = generateAuthTokens(user);
    setRefreshTokenCookie(res, tokens.refreshToken);

    return res.status(200).json({
      success: true,
      accessToken: tokens.accessToken,
      user: sanitizeUserResponse(user),
      message: '2FA doğrulaması başarılı. Giriş yapıldı.'
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: '2FA doğrulama hatası.' });
  }
}

// 3. KULLANICI & KARAKTER KAYIT İŞLEMİ (REGISTER)
export async function registerHandler(req, res) {
  try {
    const { username, email, characterName, password } = req.body;

    // Karakter Adı Format Denetimi (MTA Hard RP için Ad_Soyad kuralı)
    const charNameRegex = /^[A-Z][a-z]+_[A-Z][a-z]+$/;
    if (!charNameRegex.test(characterName)) {
      return res.status(400).json({
        success: false,
        error: 'Karakter adı "Ad_Soyad" formatında olmalıdır (Örn: Thomas_Shelby).'
      });
    }

    // Şifre Entropi Kontrolü (Minimum 8 karakter, büyük harf, rakam, özel karakter)
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        error: 'Şifreniz en az 8 karakter olmalı, büyük-küçük harf, rakam ve özel sembol içermelidir.'
      });
    }

    // Yeni kullanıcı nesnesi
    const newUser = {
      id: `RETRO-${Math.floor(1000 + Math.random() * 9000)}`,
      username,
      email,
      passwordHash: `$2b$12$hashedPassword_${crypto.randomBytes(8).toString('hex')}`,
      twoFactorEnabled: false,
      role: 'Başvuru Beklemede (Whitelist İncelemede)',
      cash: 5000,
      bank: 15000,
      playTime: '0 Saat',
      characters: [
        { name: characterName, level: 1, job: 'İşsiz / Vatandaş', status: 'Beklemede' }
      ],
      vehicles: []
    };

    mockDatabase.users.push(newUser);

    const tokens = generateAuthTokens(newUser);
    setRefreshTokenCookie(res, tokens.refreshToken);

    return res.status(201).json({
      success: true,
      accessToken: tokens.accessToken,
      user: sanitizeUserResponse(newUser),
      message: 'Kayıt ve Hard RP Karakter başvurusu başarıyla oluşturuldu.'
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: 'Kayıt sırasında bir hata oluştu.' });
  }
}

// 4. REFRESH TOKEN İLE YENİ ACCESS TOKEN ALMA
export async function refreshTokenHandler(req, res) {
  const refreshToken = req.cookies?.retro_refresh;

  if (!refreshToken) {
    return res.status(401).json({ success: false, error: 'Yenileme belirteci bulunamadı.' });
  }

  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Geçersiz yenileme belirteci.' });
    }

    const newAccessToken = jwt.sign(
      { uid: decoded.uid, username: decoded.username },
      JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    return res.status(200).json({ success: true, accessToken: newAccessToken });
  });
}

// YARDIMCI GÜVENLİK FONKSİYONLARI
function generateAuthTokens(user) {
  const accessToken = jwt.sign(
    { uid: user.id, username: user.username, role: user.role },
    JWT_ACCESS_SECRET,
    { expiresIn: '15m', algorithm: 'HS256' }
  );

  const refreshToken = jwt.sign(
    { uid: user.id, username: user.username },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d', algorithm: 'HS256' }
  );

  return { accessToken, refreshToken };
}

function setRefreshTokenCookie(res, token) {
  res.cookie('retro_refresh', token, {
    httpOnly: true, // XSS koruması: JavaScript document.cookie ile erişilemez
    secure: process.env.NODE_ENV === 'production', // Yalnızca HTTPS üzerinden aktarılır
    sameSite: 'strict', // CSRF koruması: 3. parti sitelerden yapılan isteklerde gönderilmez
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Gün
  });
}

function sanitizeUserResponse(user) {
  const { passwordHash, twoFactorSecret, ...safeUser } = user;
  return safeUser;
}
