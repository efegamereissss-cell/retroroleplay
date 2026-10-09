/**
 * RETRO ROLEPLAY V1 - ULTRA GÜVENLİ BACKEND SUNUCUSU
 * Multi Theft Auto (MTA) Hard RP Web Servisi
 */

import express from 'express';
import cors from 'cors';
import { 
  sanitizeRequestData, 
  sqlInjectionGuard, 
  verifyJwtToken 
} from './middleware/securityMiddleware.js';
import { 
  loginHandler, 
  registerHandler, 
  verify2FaHandler, 
  refreshTokenHandler 
} from './controllers/authController.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. GÜVENLİK BAŞLIKLARI (HELMET MANUEL MİMARİSİ)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' mtasa://*;"
  );
  next();
});

// 2. CORS AYARLARI
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
}));

// 3. DOS KORUMASI İÇİN BOYUT SINIRLI BODY PARSER
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 4. GLOBAL GÜVENLİK MİDDLEWARE'LERİ
app.use(sanitizeRequestData);
app.use(sqlInjectionGuard);

// 5. BRUTE FORCE VE RATE LIMITING SİMÜLASYONU
const rateLimitCache = new Map();
function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 Dakika
  const maxRequests = 10; // 15 dakikada en fazla 10 login denemesi

  const record = rateLimitCache.get(ip) || { count: 0, startTime: now };

  if (now - record.startTime > windowMs) {
    record.count = 1;
    record.startTime = now;
  } else {
    record.count += 1;
  }

  rateLimitCache.set(ip, record);

  if (record.count > maxRequests) {
    return res.status(429).json({
      success: false,
      error: 'Çok fazla başarısız deneme yapıldı. Güvenliğiniz için 15 dakika kilitlendiniz.'
    });
  }

  next();
}

// 6. API ROTALARI
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    server: 'Retro Roleplay V1 Auth API',
    mta_server: '45.143.11.113:22003',
    uptime: process.uptime(),
    security_shield: 'Active'
  });
});

// Auth Uç Noktaları
app.post('/api/auth/login', rateLimiter, loginHandler);
app.post('/api/auth/register', rateLimiter, registerHandler);
app.post('/api/auth/verify-2fa', verify2FaHandler);
app.post('/api/auth/refresh', refreshTokenHandler);

// Korumalı UCP Uç Noktası (JWT Gerektirir)
app.get('/api/ucp/profile', verifyJwtToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
    message: 'JWT Korumalı profil verisi başarıyla çekildi.'
  });
});

// 7. SUNUCUYU BAŞLATMA
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[RETRO ROLEPLAY V1] Güvenlikli Auth Sunucusu Port ${PORT} üzerinde çalışıyor.`);
    console.log(`[MTA BAĞLANTISI] Hedef Sunucu: 45.143.11.113:22003`);
  });
}

export default app;
