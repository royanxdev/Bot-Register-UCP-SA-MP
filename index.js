// Import modules
const { Events, EmbedBuilder, ActivityType, ChannelType, Collection } = require('discord.js');
const ExtendedClient = require('./src/class/ExtendedClient');
const server = require("./activity.js");
const { updateEmbed } = require('./livemonitor');
require('./watcher');


// Initialize client
const client = new ExtendedClient();
client.start();

const ChannelSticky = ['1384945063695486986', '1384945067541921813', '1384945068816728115', '1384945072054997033', '1384945073816604743'];
const logsAntiRaid = '1384944904400142386';
const logChannelPortal = '1384944904400142386';
const logChannelBooster = '1384944904400142386';
const targetChannelId = ['1384945063695486986', '1384945067541921813', '1384945065494843452', '1384945068816728115', '1384945072054997033', '1384945073816604743', '1384945007605055588', '1384944928479514787'];
const channelId = '1384944951795908649';
const raidThreshold = 5;
const timeLimit = 10000;
const antiRaidCache = new Collection();
const invitesCache = new Collection();
const lastMessageCache = new Map(); // Untuk sticky message

// Fungsi untuk normalisasi teks agar bisa dideteksi meski disamarkan
/*function normalizeMessage(content) {
    return content
        .toLowerCase()
        .replace(/[\W_]/g, '') // hapus simbol, spasi, dll
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}*/

const toxicWords = [
  // Kata-kata kasar umum (Indonesia)
  "anjing", "ajg", "anjir", "anjay", "bangsat", "bajingan", "bangsad", "bngst",
  "kontol", "kntl", "konthol", "memek", "mmk", "memex", "ngentod", "ngtd", "ngentot",
  "asu", "asw", "asuu", "goblok", "goblog", "gblk", "tolol", "idiot", "bego", "kampret",
  "brengsek", "sarap", "saraap", "keparat", "pantat", "perek", "pelacur", "jembut", "titit",
  "sange", "ml", "seks", "sex", "bokep", "coli", "masturbasi", "jilat", "peju", "kondom",

  // Kata kasar dalam bahasa Inggris
  "fuck", "fck", "fak", "shit", "sht", "bitch", "btch", "bastard", "asshole", "dick",
  "pussy", "cunt", "jerk", "slut", "whore", "nigga", "niga", "niggas", "bish", "fucker",

  // Bahasa daerah (Jawa, Sunda) yang digunakan menghina
  "asu", "kamu asu", "kontolmu", "goblokmu", "bangsatmu", "jancok", "jancuk", "cok",
  "ndasmu", "matamu", "siah", "tai", "taik", "ewean", "ewek", "koplok", "siah", "bejad",
  "cupu", "idiot teh", "sasat", "kabehan", "gaje", "gajelas", "jebluk", "silit", "jancokmu",

  // Penghinaan sosial
  "yatim", "piatu", "banci", "bencong", "waria", "homo", "gay", "lesbi", "sakit jiwa",
  "cacat", "tolol", "idiot", "otak udang", "otak kecebong", "otak sungsang", "pikun",
  "anak haram", "anak setan", "anak iblis", "pengemis", "kere", "miskin", "dekil", "jelek",

  // Variasi dan singkatan
  "4nj1ng", "k0nt0l", "m3m3k", "g0bl0k", "b4ngs4t", "k0ntol", "j4nc0k", "s3x", "f*ck", "d!ck", "b!tch"
];

// Event Ready
client.once('ready', async () => {
    client.guilds.cache.forEach(async (guild) => {
        const invites = await guild.invites.fetch();
        invitesCache.set(guild.id, invites);
    });

    setInterval(() => {
        server.stats().then((data) => {
            client.user.setActivity(`[${data.online}/${data.maxplayers}] | #Nosterna Roleplay`, { type: ActivityType.Playing });
        }).catch(() => {
            client.user.setActivity('Server Offline | #Nosterna Roleplay', { type: ActivityType.Watching });
        });
    }, 60000);

    const channel = client.channels.cache.get(channelId);
    if (channel.type === ChannelType.GuildText) await channel.bulkDelete(1, true).catch(console.error);
    updateEmbed(client, channelId);
    setInterval(() => updateEmbed(client, channelId), 60000);
});

// Event Message Create
client.on('messageCreate', async (message) => {
    if (message.author.id === client.user.id) return;
    if (!targetChannelId.includes(message.channel.id)) return;

    // 💥 Filter kata toxic
    if (!message.guild || !message.member) return;

    // Cek apakah pesan mengandung kata-kata toxic dari array toxicWords
    const containsToxicWord = toxicWords.some(word => {
    // Cari kata kasar (case-insensitive dan whole-word match)
    return message.content.toLowerCase().includes(word.toLowerCase());
    });

    if (containsToxicWord) {
    await message.delete().catch(() => {});

    // Cegah spam jika member sedang timeout
    if (message.member.isCommunicationDisabled()) {
        return message.channel.send(`${message.author}, Anda sedang dalam masa timeout.`)
        .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
    }

    // Timeout 2 menit jika bot punya izin
    if (
        message.guild.members.me.permissions.has('ModerateMembers') &&
        message.member.moderatable
    ) {
        try {
        await message.member.timeout(120 * 1000, 'Menggunakan kata-kata toxic');
        console.log(`⏳ ${message.author.tag} dikenai timeout sampai: ${message.member.communicationDisabledUntil}`);
        } catch (error) {
        console.warn(`⚠️ Gagal timeout ${message.author.tag}: ${error.message}`);
        }
    } else {
        console.warn(`❌ Bot tidak bisa memoderasi ${message.author.tag} (izin ModerateMembers kurang).`);
    }

    return message.channel.send(`${message.author}, penggunaan kata-kata toxic tidak diizinkan di sini. Anda dikenai timeout selama 2 menit.`)
        .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
    }

    // 🔗 Anti link (user non-admin)
    if (
        !message.member?.roles.cache.has('1384944603114770453') && // bukan admin
        /https?:\/\/[^\s]+/.test(message.content) && // mendeteksi link
        !['1384945068816728115', '1384945073816604743', '1384945059849572393', '1384945061455859723'].includes(message.channel.id) // channel yang DIBOLEHKAN kirim link
    ) {
        await message.delete().catch(() => {});
        return message.channel.send(`${message.author}, hanya admin yang boleh mengirim link di channel ini.`)
            .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
    }

    // 📌 Sticky Message
    if (ChannelSticky.includes(message.channel.id)) {
        const lastMessage = lastMessageCache.get(message.channel.id);
        if (lastMessage) {
            try { await lastMessage.delete(); } catch (e) {}
        }

        try {
            const sticky = await message.channel.send('**__⚠️ WARNING__**\nkirim pesan atau gambar sesuaikan dengan channel di sediakan, jika melanggar akan kena timeout!!');
            lastMessageCache.set(message.channel.id, sticky);
        } catch (error) {
            console.error(`Gagal mengirim sticky: ${error}`);
        }

        if (!message.author.bot) {
            const threadName = message.content.substring(0, 50) || 'New Thread';
            await message.startThread({
                name: threadName,
                autoArchiveDuration: 1440,
                type: ChannelType.PublicThread,
            }).catch(() => {});
        }
    }
});

// Event Member Join
client.on('guildMemberAdd', async (member) => {
    const logChannelJoinned = member.guild.channels.cache.get(logChannelPortal);
    if (logChannelJoinned) logChannelJoinned.send(`:inbox_tray: **${member.user.tag}** joinned this server.`);
    const logChannel = member.guild.channels.cache.get(logsAntiRaid);
    if (!logChannel) return;

    const guildId = member.guild.id;
    const now = Date.now();
    if (!antiRaidCache.has(guildId)) antiRaidCache.set(guildId, []);

    const joinTimestamps = antiRaidCache.get(guildId);
    joinTimestamps.push(now);
    const filteredTimestamps = joinTimestamps.filter(t => now - t < timeLimit);
    antiRaidCache.set(guildId, filteredTimestamps);

    if (filteredTimestamps.length >= raidThreshold) {
        logChannel.send(`:warning: Raid terdeteksi! Lebih dari ${raidThreshold} anggota bergabung dalam ${timeLimit / 1000} detik.`);
        filteredTimestamps.forEach(() => {
            member.kick('Anti-raid system triggered.').catch(console.error);
        });
        antiRaidCache.set(guildId, []);
    }
});

// Event Member Leave
client.on('guildMemberRemove', (member) => {
    const logChannel = member.guild.channels.cache.get(logChannelPortal);
    if (logChannel) logChannel.send(`:outbox_tray: **${member.user.tag}** out this server.`);
});

// Event Boost Update
client.on(Events.GuildMemberUpdate, (oldMember, newMember) => {
    const logChannel = newMember.guild.channels.cache.get(logChannelBooster);
    if (!logChannel) return;

    if (!oldMember.premiumSince && newMember.premiumSince) {
        logChannel.send(`:sparkles: **${newMember.user.tag}** start boosting server! 🎉`);
    } else if (oldMember.premiumSince && !newMember.premiumSince) {
        logChannel.send(`:x: **${newMember.user.tag}** stop boosting server.`);
    }
});

// Global Error Handler
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
