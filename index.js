// ======================================================
// 📚 SKRIP LENGKAP - BOT WA BUATAN SENDIRI
// NOMOR : 6285242263788
// FITUR : .ping .halo .info .menu .pembuat
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

// ======================================================
// 🟦 BAGIAN 2: PENGATURAN UTAMA
// ======================================================
const prefix = '.'
const nomorPemilik = '6285242263788'
const namaBot = 'Bot Buatan Sendiri'
const versiBot = '1.0'

// ======================================================
// 🟦 BAGIAN 3: BUAT FOLDER & DATABASE
// ======================================================
if (!fs.existsSync('./session')) fs.mkdirSync('./session')
if (!fs.existsSync('./database')) fs.mkdirSync('./database')

const berkasData = './database/data.json'
if (!fs.existsSync(berkasData)) fs.writeFileSync(berkasData, JSON.stringify({}))
let dataPengguna = JSON.parse(fs.readFileSync(berkasData))

const simpanData = () => fs.writeFileSync(berkasData, JSON.stringify(dataPengguna, null, 2))

// ======================================================
// 🟦 BAGIAN 4: FUNGSI UTAMA NYALAKAN BOT
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
    // 🟦 BAGIAN 5: BACA PESAN & FITUR PERINTAH
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
                text: `🤖 NAMA BOT : ${namaBot}\n🔖 VERSI : ${versiBot}\n👑 PEMILIK : +${nomorPemilik}\n📝 KETERANGAN : Bot ini saya buat sendiri dari nol, belajar langkah demi langkah! ✨` 
            })
        }

        // ✅ FITUR .PEMBUAT
        else if (perintah === 'pembuat') {
            await conn.sendMessage(dariRuang, { text: '🧑‍💻 Bot ini dibuat oleh: Kamu Sendiri! 🫵🔥' })
        }

        // ✅ FITUR .MENU
        else if (perintah === 'menu') {
            const daftarMenu = `
📋 DAFTAR MENU BOT
━━━━━━━━━━━━━━━━
✅ .ping → Cek bot nyala
✅ .halo → Sapa bot
✅ .info → Info lengkap bot
✅ .pembuat → Lihat siapa pembuatnya
✅ .menu → Tampilkan daftar ini

💡 Awalan pakai tanda titik (.)
            `
            await conn.sendMessage(dariRuang, { text: daftarMenu.trim() })
        }

        simpanData()
    })

} // AKHIR FUNGSI UTAMA

// ======================================================
// 🟦 BAGIAN 6: PENGAMAN & JALANKAN BOT
// ======================================================
process.on('uncaughtException', console.log)
process.on('unhandledRejection', console.log)

mulaiBot()
