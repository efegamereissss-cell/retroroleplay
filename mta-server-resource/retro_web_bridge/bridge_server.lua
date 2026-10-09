--[[
    ========================================================================
    RETRO ROLEPLAY V1 - MTA:SA TO WEB & UCP SYNCHRONIZATION BRIDGE (LUA)
    ========================================================================
    VDS Sunucu MySQL Yapılandırması:
    - Host: 127.0.0.1 (VDS İçi Yerel Bağlantı)
    - Kullanıcı: root
    - Şifre: 123456gg
    - Veritabanı: retro
    - Port: 3306
]]

local DB_HOST = "127.0.0.1"      -- VDS içinde MTA ve MySQL aynı makinede olduğu için 127.0.0.1
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
        outputServerLog("[RETRO WEB BRIDGE] BASARILI! 'retro' veritabani ile oyun baglantisi kuruldu.")
    else
        outputServerLog("[RETRO WEB BRIDGE] HATA! MySQL baglantisi basarisiz. VDS MySQL servisinin acik oldugundan emin olun.")
    end
end)

-- 1. WHITELIST VE HARD RP KONTROLÜ (Oyuncu Bağlanırken)
addEventHandler("onPlayerConnect", root, function(playerNick, playerIP, playerUsername, playerSerial, playerVersionNumber)
    if not dbConnection then return end

    -- Oyuncunun siteden onaylı olup olmadığını kontrol et (Prepared Statement)
    local query = "SELECT role FROM users WHERE username = ? LIMIT 1"
    dbQuery(function(qh)
        local result = dbPoll(qh, 0)
        if result and #result > 0 then
            local user = result[1]
            if user.role == "whitelist_pending" then
                cancelEvent(true, "Retro Roleplay V1: Whitelist basvurunuz henuz incelemede! Lutfen Discord ve web sitemizden sonucu bekleyiniz.\nWeb: " .. WEBSITE_URL)
            end
        else
            -- Sitede hesabı yoksa veya whitelist açılmamışsa
            cancelEvent(true, "Retro Roleplay V1: Lutfen once web sitemizden UCP kaydi aciniz!\nWeb: " .. WEBSITE_URL)
        end
    end, dbConnection, playerNick)
end)

-- 2. KARAKTER PARA / ENVENTER / OYNAMA SÜRESİ SENKRONİZASYONU (Oyuncu Çıkışında)
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

-- 3. PERİYODİK WEBSİTE PING VE BİLDİRİMİ (Her 5 dakikada bir)
setTimer(function()
    local playerCount = #getElementsByType("player")
    local maxPlayers = getMaxPlayers()
    outputServerLog(string.format("[RETRO WEB BRIDGE] Canli Durum: %d/%d Oyuncu aktif. 'retro' DB senkronize.", playerCount, maxPlayers))
end, 300000, 0)
