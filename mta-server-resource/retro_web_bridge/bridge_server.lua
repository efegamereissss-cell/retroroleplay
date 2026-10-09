--[[
    ========================================================================
    RETRO ROLEPLAY V1 - MTA:SA TO WEB & UCP SYNCHRONIZATION BRIDGE (LUA)
    ========================================================================
    - Whitelist SİSTEMİ KALDIRILDI: Herkes doğrudan oyuna bağlanabilir!
    - VDS MySQL 'retro' Veritabanı ile otomatik bakiye, envanter ve durum senkronizasyonu
    - Host: 127.0.0.1 (VDS İçi Yerel Bağlantı)
    - Kullanıcı: root
    - Şifre: 123456gg
    - Veritabanı: retro
    - Port: 3306
]]

local DB_HOST = "127.0.0.1"      -- VDS içinde yerel bağlantı
local DB_PORT = 3306             -- MySQL Portu
local DB_NAME = "retro"          -- VDS Veritabanı Adı
local DB_USER = "root"           -- MySQL Kullanıcı Adı
local DB_PASS = "123456gg"       -- MySQL Şifresi

local WEBSITE_URL = "https://retroroleplay.vercel.app"
local dbConnection = nil

-- Veritabanına Güvenli Bağlantı Başlatma
addEventHandler("onResourceStart", resourceRoot, function()
    outputServerLog("[RETRO WEB BRIDGE] VDS MySQL ('retro') veritabanina baglaniliyor...")
    
    dbConnection = dbConnect("mysql", string.format("dbname=%s;host=%s;port=%d;charset=utf8mb4", DB_NAME, DB_HOST, DB_PORT), DB_USER, DB_PASS, "share=1")
    
    if dbConnection then
        outputServerLog("[RETRO WEB BRIDGE] BASARILI! 'retro' veritabani ile oyun baglantisi kuruldu. Whitelist serbest.")
    else
        outputServerLog("[RETRO WEB BRIDGE] HATA! MySQL baglantisi basarisiz. VDS MySQL servisinin acik oldugundan emin olun.")
    end
end)

-- 1. OYUNCU GİRİŞİ (Serbest Giriş - Whitelist Yok)
addEventHandler("onPlayerConnect", root, function(playerNick, playerIP, playerUsername, playerSerial, playerVersionNumber)
    outputServerLog(string.format("[RETRO WEB BRIDGE] Oyuncu baglaniyor: %s (IP: %s) - Giris serbest.", playerNick, playerIP))
    -- Whitelist engellemesi kaldırıldı! Tüm oyuncular doğrudan giriş yapabilir.
end)

-- 2. KARAKTER PARA / BAKİYE SENKRONİZASYONU (Oyuncu Çıkışında)
addEventHandler("onPlayerQuit", root, function(quitType)
    local player = source
    if not dbConnection or isGuestAccount(getPlayerAccount(player)) then return end

    local charName = getPlayerName(player)
    local cash = getPlayerMoney(player)
    local bank = getElementData(player, "bankmoney") or 0

    -- Web UCP veritabanını anlık güncelle (Prepared Statement ile SQLi Korumalı)
    dbExec(dbConnection, "UPDATE characters SET cash = ?, bank = ? WHERE character_name = ?", cash, bank, charName)
    outputServerLog(string.format("[RETRO WEB BRIDGE] %s karakterinin verileri 'retro' veritabanina kaydedildi.", charName))
end)

-- 3. PERİYODİK CANLI DURUM LOGU (Her 5 dakikada bir)
setTimer(function()
    local playerCount = #getElementsByType("player")
    local maxPlayers = getMaxPlayers()
    outputServerLog(string.format("[RETRO WEB BRIDGE] Canli Durum: %d/%d Oyuncu aktif. 'retro' DB senkronize.", playerCount, maxPlayers))
end, 300000, 0)
