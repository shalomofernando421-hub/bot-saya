// ======================================================
// 📚 SKRIP LENGKAP PENUH - SEMUA KODE SUDAH MASUK
// NOMOR : 6281382856937
// FITUR LENGKAP: Semua yang kita buat + Tambahan Baru
// ======================================================

// ======================================================
// 🟦 BAGIAN 1: PANGGIL ALAT / MODUL
// ======================================================
const { 
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState
} = require('@whiskeysockets/baileys')

const P = require('pino')
const fs = require('fs')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const PORT = process.env.PORT || 3000

// ======================================================
// 🟦 BAGIAN 2: PENGATURAN UTAMA
// ======================================================
const prefix = '.'
const nomorPemilik = '6285242263788'
const namaBot = 'Bot Buatan Sendiri'
const versiBot = '1.1 - Lengkap Penuh'

// ======================================================
// 🟦 BAGIAN 3: BUAT FOLDER & DATABASE
// ======================================================
if (!fs.existsSync('./session')) fs.mkdirSync('./session')
if (!fs.existsSync('./database')) fs.mkdirSync('./database')
if (!fs.existsSync('./backup')) fs.mkdirSync('./backup')

const berkasData = './database/data.json'
if (!fs.existsSync(berkasData)) fs.writeFileSync(berkasData, JSON.stringify({}))
let dataPengguna = JSON.parse(fs.readFileSync(berkasData))

const simpanData = () => fs.writeFileSync(berkasData, JSON.stringify(dataPengguna, null, 2))
setInterval(simpanData, 30000)

// ======================================================
// 🟦 BAGIAN 4: HALAMAN PANEL WEB
// ======================================================
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <title>🌸 PANEL - ANIME LOVERS BOT</title>
        <style>
            *{margin:0;padding:0;box-sizing:border-box;font-family:sans-serif}
            body{background:#1a1a2e;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh}
            .card{background:#16213e;padding:30px;border-radius:16px;box-shadow:0 0 20px #00000040;width:400px;text-align:center}
            h1{color:#e94560;margin-bottom:10px}
            .status{padding:12px;border-radius:8px;margin:15px 0;background:#0f3460}
            .aktif{background:#2ecc71}
            p{margin:8px 0}
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🌸 ANIME LOVERS BOT</h1>
            <div class="status aktif">✅ BOT SEDANG NYALA 24 JAM</div>
            <p>📱 Nomor Bot : +62 852-4226-3788</p>
            <p>👑 Pemilik : +62 852-4226-3788</p>
            <p>👥 Pengguna Terdaftar : ${Object.keys(dataPengguna).length} orang</p>
            <p>✨ Fitur Lengkap Aktif ✅</p>
            <br>
            <p>💡 Dibuat sendiri dari nol ✨</p>
        </div>
    </body>
    </html>
    `)
})

// ======================================================
// 🟦 BAGIAN 5: FUNGSI UTAMA NYALAKAN BOT
// ======================================================
async function mulaiBot() {

    const { state, saveCreds } = await useMultiFileAuthState('./session')

    const conn = makeWASocket({
        logger: P({ level: 'silent' }),
        auth: state,
        printQRInTerminal: false,
        browser: ['Samsung A54', 'Android', '14'],
        syncFullHistory: false
    })

    // 🔑 TAMPILKAN KODE PASANGAN
    if (!conn.authState.creds.registered) {
        setTimeout(async () => {
            try {
                let kode = await conn.requestPairingCode(nomorPemilik)
                kode = kode.toUpperCase().match(/.{1,4}/g).join("-")
                console.log("\n=====================================")
                console.log("✅ KODE PASANGAN : ", kode)
                console.log("⚠️ MASUKKAN KE WA SEKARANG < 15 DETIK ⚠️")
                console.log("=====================================\n")
            } catch {
                console.log("❌ GAGAL! Nomor dibatasi WA, pakai nomor lama saja")
            }
        }, 4000)
    }

    conn.ev.on('creds.update', saveCreds)

    conn.ev.on('connection.update', (koneksi) => {
        const { connection, lastDisconnect } = koneksi
        if (connection === 'open') console.log("✅ BOT BERHASIL NYALA & TERHUBUNG! 🚀")
        if (connection === 'close') {
            const kodeEror = lastDisconnect?.error?.output?.statusCode
            if (kodeEror !== DisconnectReason.loggedOut) mulaiBot()
        }
    })

    // ======================================================
    // 🟦 BAGIAN 6: FITUR SAMBUT ANGGOTA GRUP
    // ======================================================
    conn.ev.on('group-participants.update', async (data) => {
        for (let num of data.participants) {
            if (data.action === 'add') {
                const teks = `╔═════¦✵𝐀𝐧𝐢𝐦𝐞 𝐥𝐨𝐯𝐞𝐫𝐬✵¦═════╗

𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐌𝐄𝐌𝐁𝐄𝐑 𝐁𝐀𝐑𝐔 𝐈𝐍𝐓𝐑𝐎 𝐃𝐔𝐋𝐔 𝐘𝐀𝐇𝐇

╠➣ 𝐍𝐀𝐌𝐀 : 
╠➣ 𝐔𝐌𝐔𝐑 : 
╠➣ 𝐊𝐄𝐋𝐀𝐒 : 
╠➣ 𝐀𝐒𝐊𝐎𝐓 : 
╠➣ 𝐆𝐄𝐍𝐃𝐄𝐑 : 
╠➣ 𝐀𝐍𝐈𝐌𝐄 𝐅𝐀𝐕 : 
╠➣ 𝐇𝐔𝐒𝐁𝐔/𝐖𝐀𝐈𝐅𝐔 :

╠𝐈𝐓𝐔 𝐀𝐉𝐀 𝐒𝐄𝐌𝐎𝐆𝐀 𝐁𝐄𝐓𝐀𝐇 𝐘𝐀 
┗✦╬═•• 𝐀𝐑𝐈𝐆𝐀𝐓𝐎𝐔••═╬✦

⋆ ˚｡⋆୨୧˚　˚୨୧⋆｡˚ ⋆ 
𝐆𝐑𝐔𝐁 𝐁𝐔𝐊𝐀 𝟬𝟱.𝟯𝟬 
𝐆𝐑𝐔𝐁 𝐓УТУ𝐑 𝟮𝟮.𝟬𝟬 
𝐒𝐀𝐁Т𝐔 𝐌𝐈𝐍𝐆𝐆𝐔 𝐁У𝐊𝐀 𝟮𝟰 𝙟𝙖𝙢 
⋆ ˚｡⋆୨୧˚　˚୨୧⋆｡˚ ⋆`

                await conn.sendMessage(data.id, {
                    text: `🌸 Welcome @${num.split('@')[0]}\n\n${teks}`,
                    mentions: [num]
                })
            } else if (data.action === 'remove') {
                await conn.sendMessage(data.id, {
                    text: `👋 Sayonara @${num.split('@')[0]}`,
                    mentions: [num]
                })
            }
        }
    })

    // ======================================================
    // 🟦 BAGIAN 7: BACA PESAN & SEMUA FITUR PERINTAH 
    // ⚠️ SEMUA KODE KITA ADA DI SINI, SUDAH MASUK SEMUA ✅
    // ======================================================
    conn.ev.on('messages.upsert', async (pesanMasuk) => {
        const m = pesanMasuk.messages[0]
        if (!m.message) return

        const pengirim = m.key.participant || m.key.remoteJid
        const dariRuang = m.key.remoteJid
        const isiPesan = m.message.conversation || m.message.extendedTextMessage?.text || ''

        const pesanBersih = isiPesan.toLowerCase()
        const perintah = pesanBersih.startsWith(prefix) ? pesanBersih.slice(1).split(' ')[0] : ''

        // ✅ FITUR .PING
        if (perintah === 'ping') {
            await conn.sendMessage(dariRuang, { text: '🏓 PONG! Bot Hidup & Lancar ✅' })
        }

        // ✅ FITUR .HALO
        else if (perintah === 'halo') {
            await conn.sendMessage(dariRuang, { text: '👋 Halo juga! Saya Bot buatan sendiri, siap membantu 😊' })
        }

        // ✅ FITUR .INFO
        else if (perintah === 'info') {
            await conn.sendMessage(dariRuang, { 
                text: `🤖 NAMA BOT : ${namaBot}\n🔖 VERSI : ${versiBot}\n👑 PEMILIK : +${nomorPemilik}\n📝 KETERANGAN : Bot ini saya buat sendiri dari nol, lengkap fitur grup & panel web! ✨` 
            })
        }

        // ✅ FITUR .PEMBUAT
        else if (perintah === 'pembuat') {
            await conn.sendMessage(dariRuang, { text: '🧑‍💻 Bot ini dibuat oleh: Kamu Sendiri! 🫵🔥' })
        }

        // ✅ FITUR .MENU
        else if (perintah === 'menu') {
            const daftarMenu = `
📋 DAFTAR MENU BOT LENGKAP
━━━━━━━━━━━━━━━━
✅ .ping → Cek bot nyala
✅ .halo → Sapa bot
✅ .info → Info lengkap bot
✅ .pembuat → Lihat siapa pembuatnya
✅ .menu → Tampilkan daftar ini
✅ .test → Contoh fitur baru
✅ .waktu → Lihat jam sekarang

✨ Fitur Otomatis:
→ Sambut anggota baru
→ Pesan kalau ada yang keluar

💡 Awalan pakai tanda titik (.)
            `
            await conn.sendMessage(dariRuang, { text: daftarMenu.trim() })
        }

        // ======================================================
        // ✅ INI DIA! KODE YANG KAMU MINTA, SUDAH SAYA MASUKAN DI SINI ✅
        // ======================================================
        
        // ✅ FITUR BARU .TEST
        else if (perintah === 'test') {
            await conn.sendMessage(dariRuang, { text: '✅ Ini fitur baru yang aku tambah sendiri! Berhasil jalan!' })
        }

        // ✅ FITUR BARU .WAKTU
        else if (perintah === 'waktu') {
            const sekarang = new Date().toLocaleString('id-ID')
            await conn.sendMessage(dariRuang, { text: `⏰ Waktu sekarang: ${sekarang}` })
        }

        // ✅ KALAU MAU TAMBAH FITUR LAIN, TULIS DI BAWAH SINI TERUS ✍️

        simpanData()
    })

} // AKHIR FUNGSI UTAMA

// ======================================================
// 🟦 BAGIAN 8: JALANKAN SEMUA
// ======================================================
server.listen(PORT, () => console.log(`🌐 PANEL WEB DIBUKA DI : ${PORT}`))
process.on('uncaughtException', console.log)
process.on('unhandledRejection', console.log)

mulaiBot()
