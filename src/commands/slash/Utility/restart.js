const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Melakukan simulasi restart pada server Nosterna Roleplay'),

    /**
     * @param {ExtendedClient} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const allowedUserId = '769759712039796736'; // Ganti sesuai user yang diizinkan

        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({
                content: '❌ Kamu tidak memiliki izin untuk menggunakan perintah ini.',
                ephemeral: true
            });
        }

        const channelId = '1384944936939425944'; // ID channel tujuan

        const getTimeNow = () =>
            new Date().toLocaleString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Jakarta',
                hour12: false,
            }) + ' WIB';

        const gifRestart = 'https://media.discordapp.net/attachments/1373428066835103774/1385527296768610344/standard_4.gif';
        const gifOnline = 'https://media.discordapp.net/attachments/1373428066835103774/1385518604509904996/standard_3.gif';

        const restartEmbed = new EmbedBuilder()
            .setColor(0xFFD700)
            .setTitle('🔁 SERVER SEDANG MELAKUKAN RESTART 🔁')
            .setDescription(
                `🚧 *Server sedang menjalani restart rutin untuk meningkatkan performa dan stabilitas layanan.*\n\n` +
                `Mohon menunggu sebentar hingga proses restart selesai. Kami sangat menghargai kesabaran Anda.\n\n` +
                `__**Status**__\n🔄 **Restart Sedang Berlangsung**\n\n` +
                `__**Estimasi Selesai**__\n⏳ **± 1 Menit**\n\n` +
                `🛠️ *Sistem sedang dimuat ulang dan dipersiapkan kembali.*\n📅 ${getTimeNow()}`
            )
            .setImage(gifRestart);

        const onlineEmbed = new EmbedBuilder()
            .setColor(0x26A65B)
            .setTitle('🌟 SERVER TELAH BEROPERASI NORMAL 🌟')
            .setDescription(
                `✅ *Server telah kembali online dan dapat digunakan seperti biasa.*\n` +
                `Terima kasih atas kesabaran dan pengertian Anda selama proses restart berlangsung.\n\n` +
                `__**Status**__\n🟢 **Online & Stabil**\n\n` +
                `__**Keterangan**__\n📌 Semua sistem telah dipulihkan dan siap digunakan.\n\n` +
                `🕒 ${getTimeNow()} | 🤝 Kami senang melayani Anda kembali.`
            )
            .setImage(gifOnline);

        try {
            const targetChannel = client.channels.cache.get(channelId);
            if (!targetChannel) {
                return interaction.reply({
                    content: '❌ Channel tidak ditemukan. Cek ID channel.',
                    ephemeral: false
                });
            }

            await targetChannel.send({ content: '@everyone', embeds: [restartEmbed] });
            await interaction.reply({ content: '✅ Status restart berhasil dikirim.', ephemeral: false });

            setTimeout(async () => {
                await targetChannel.send({ content: '@everyone', embeds: [onlineEmbed] });
            }, 120000); // 2 menit (120000 ms)

        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: '❌ Terjadi kesalahan saat mengirim status restart.',
                ephemeral: false
            });
        }
    }
};
