const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const MysqlGrand = require('./Mysql');
const config = require('./config');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const CHANNEL_ID = "1398281037322387598";
const SENT_LOGS_FILE = path.join(__dirname, 'adminlogs.json');

let sentSignatures = new Set();

// Load signature yang sudah dikirim sebelumnya
if (fs.existsSync(SENT_LOGS_FILE)) {
    try {
        const data = fs.readFileSync(SENT_LOGS_FILE, 'utf-8');
        sentSignatures = new Set(JSON.parse(data));
    } catch (err) {
        console.error('❌ Gagal membaca adminlogs.json:', err);
    }
}

async function checkAdminLogs() {
    try {
        const [rows] = await MysqlGrand.query('SELECT * FROM adminlogs ORDER BY Time ASC');

        for (const row of rows) {
            const signature = `${row.Time}|${row.UCP}|${row.Rank}|${row.Activity}`;
            if (sentSignatures.has(signature)) continue;

            const channel = await client.channels.fetch(CHANNEL_ID);

            const embed = new EmbedBuilder()
                .setTitle('🧾 Log Admin')
                .setColor('FFFF00')
                .addFields(
                    { name: '👤 UCP', value: row.UCP || 'Tidak diketahui', inline: true },
                    { name: '🎖️ Rank', value: row.Rank || 'Tidak diketahui', inline: true },
                    { name: '⚙️ Aktivitas', value: row.Activity || 'Tidak diketahui', inline: false },
                    { name: '🕒 Waktu', value: row.Time?.toString() || 'Tidak diketahui', inline: false },
                )
                .setTimestamp()
                .setFooter({ text: 'Nosterna Admin Log Monitor' });

            await channel.send({ embeds: [embed] });

            sentSignatures.add(signature);
        }

        // Simpan kembali signature ke file
        fs.writeFileSync(SENT_LOGS_FILE, JSON.stringify(Array.from(sentSignatures)), 'utf-8');
    } catch (err) {
        console.error('❌ Gagal membaca adminlogs:', err);
    }
}

client.once('ready', () => {
    console.log(`\x1b[32m[SUCCESS]\x1b[0m Bot pemantau adminlogs aktif sebagai ${client.user.tag}`);
    setInterval(checkAdminLogs, 5000);
});

client.login(config.client.token);
