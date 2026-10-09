-- ========================================================
-- RETRO ROLEPLAY V1 - VERİTABANI GÜVENLİK ŞEMASI (SQL)
-- MariaDB / MySQL 8.0+ & SQLite Uyumlu Şema
-- Karakter Kümesi: utf8mb4 / utf8mb4_unicode_ci
-- ========================================================

-- 1. KULLANICI HESAPLARI TABLOSU (UCP & AUTH)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `ucp_uid` VARCHAR(32) NOT NULL UNIQUE,
  `username` VARCHAR(32) NOT NULL UNIQUE,
  `email` VARCHAR(128) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL, -- bcrypt 12-round hash
  `two_factor_secret` VARCHAR(64) DEFAULT NULL, -- TOTP Base32 Secret
  `two_factor_enabled` TINYINT(1) NOT NULL DEFAULT 0,
  `role` ENUM('player', 'whitelist_pending', 'admin', 'moderator', 'developer') NOT NULL DEFAULT 'whitelist_pending',
  `failed_login_attempts` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `lockout_until` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. HARD ROLEPLAY KARAKTERLER TABLOSU
CREATE TABLE IF NOT EXISTS `characters` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `character_name` VARCHAR(48) NOT NULL UNIQUE, -- 'Ad_Soyad' formatı zorunlu
  `cash` BIGINT NOT NULL DEFAULT 5000,
  `bank` BIGINT NOT NULL DEFAULT 15000,
  `level` INT UNSIGNED NOT NULL DEFAULT 1,
  `job` VARCHAR(64) NOT NULL DEFAULT 'İşsiz / Vatandaş',
  `faction_id` INT UNSIGNED DEFAULT NULL,
  `faction_rank` VARCHAR(32) DEFAULT NULL,
  `is_dead` TINYINT(1) NOT NULL DEFAULT 0, -- CK (Character Kill) Durumu
  `ck_reason` TEXT DEFAULT NULL,
  `play_time_minutes` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_char_name` (`character_name`),
  INDEX `idx_user_char` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. KARAKTER ARAÇLARI (GARAJ) TABLOSU
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `character_id` INT UNSIGNED NOT NULL,
  `model_name` VARCHAR(64) NOT NULL,
  `plate` VARCHAR(16) NOT NULL UNIQUE,
  `fuel` DECIMAL(5,2) NOT NULL DEFAULT 100.00,
  `engine_health` DECIMAL(6,2) NOT NULL DEFAULT 1000.00,
  `is_impounded` TINYINT(1) NOT NULL DEFAULT 0, -- Polis Tarafından Bağlanma Durumu
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. SİBER GÜVENLİK VE ERİŞİM DENETİM LOGLARI (AUDIT TRAIL)
CREATE TABLE IF NOT EXISTS `security_audit_logs` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED DEFAULT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `user_agent` TEXT NOT NULL,
  `event_type` ENUM('LOGIN_SUCCESS', 'LOGIN_FAILED', '2FA_CHALLENGE', 'PASSWORD_RESET', 'SUSPICIOUS_QUERY') NOT NULL,
  `severity` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'LOW',
  `details` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_event_type` (`event_type`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
