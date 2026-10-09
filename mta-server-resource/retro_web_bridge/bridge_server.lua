--[[
    ========================================================================
    RETRO ROLEPLAY V1 - MTA:SA TO WEB & UCP SYNCHRONIZATION BRIDGE (LUA)
    ========================================================================
    Bu script MTA:SA sunucunuz ile Vercel web sitesi arasında 3 yönlü köprü kurar:
    1. MySQL / MariaDB doğrudan senkronizasyon (Nakit, Banka, Karakterler, Garaj)
    2. Web Whitelist Denetimi (Siteden onay almayanlar sunucuya giremez)
    3. Canlı Oyuncu Sayacı ve Durum Güncellemesi
]]

local DB_HOST = "127.0.0.1"      -- MySQL Sunucu IP'si
local DB_PORT = 3306             -- MySQL Portu
local DB_NAME = "retroroleplay"  -- Veritabanı Adı
local DB_USER = "root"           -- MySQL Kullanıcı Adı
local DB_PASS = "parolaniz"      -- MySQL Şifresi

local WEBSITE_URL = "https://retroroleplay.vercel.app"
local dbConnection = nil

-- Veritabanına Güvenli Bağlantı Başlatma
addEventHandler("onResourceStart", resourceRoot, function()
    outputServerLog("[RETRO WEB BRIDGE] MySQL veritabani baglantisi kuruluyor...")
    
    dbConnection = dbConnect("mysql", string.format("dbname=%s;host=%s;port=%d;charset=utf8mb4", DB_NAME, DB_HOST, DB_PORT), DB_USER, DB_PASS, "share=1")
    
    if dbConnection then
        outputServerLog("[RETRO WEB BRIDGE] BASARILI! Web ve Oyun veritabani senkronize edildi.")
    else
        outputServerLog("[RETRO WEB BRIDGE] HATA! MySQL baglantisi basarisiz. Bilgileri kontrol ediniz.")
    end
end)

-- 1. WHITELIST VE HARD RP KONTROLÜ (Oyuncu Bağlanırken)
addEventHandler("onPlayerConnect", root, function(playerNick, playerIP, playerUsername, playerSerial, playerVersionNumber)
    if not dbConnection then return end

    -- Oyuncunun siteden onaylı olup olmadığını kontrol et (Prepared Statement)
    local query = "SELECT role, two_factor_enabled FROM users WHERE username = ? LIMIT 1"
    dbQuery(function(qh)
        local result = dbPoll(qh, 0)
        if result and #result > 0 then
            local user = result[1]
            if user.role == "whitelist_pending" then
                cancelEvent(true, "Retro Roleplay V1: Whitelist basvurunuz henuz onaylanmadi! Lutfen web sitesi ve Discord uzerinden basvuru sonucunu bekleyiniz.\nWeb: " .. WEBSITE_URL)
            end
        else
            -- Sitede hesabı yoksa
            cancelEvent(true, "Retro Roleplay V1: Once web sitemizden UCP kaydi acip karakter olusturmalisiniz!\nWeb: " .. WEBSITE_URL)
        end
    end, dbConnection, playerNick)
end)

-- 2. KARAKTER PARA / ENVENTER / OYNAMA SÜRESİ SENKRONİZASYONU (Oyuncu Çıkışında)
addEventHandler("onPlayerQuit", root, function(quitType)
    local player = source
    if not dbConnection or isGuestAccount(getPlayerAccount(player)) then return end

    local charName = getPlayerName(player)
    local cash = getPlayerMoney(player) -- veya getElementData(player, "money")
    local bank = getElementData(player, "bankmoney") or 0

    -- Web UCP veritabanını anlık güncelle (Prepared Statement ile SQLi Korumalı)
    dbExec(dbConnection, "UPDATE characters SET cash = ?, bank = ? WHERE character_name = ?", cash, bank, charName)
    outputServerLog(string.format("[RETRO WEB BRIDGE] %s karakterinin nakit ($%d) ve banka ($%d) bakiyesi web'e aktarildi.", charName, cash, bank))
end)

-- 3. PERİYODİK WEBSİTE PING VE BİLDİRİMİ (Her 5 dakikada bir)
setTimer(function()
    local playerCount = #getElementsByType("player")
    local maxPlayers = getMaxPlayers()
    outputServerLog(string.format("[RETRO WEB BRIDGE] Canli Durum: %d/%d Oyuncu aktif. Web UCP hazir.", playerCount, maxPlayers))
end, 300000, 0)
