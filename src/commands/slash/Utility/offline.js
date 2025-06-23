const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('offline')
        .setDescription('Menampilkan status bahwa Nosterna Roleplay sedang down atau mengalami badai'),

    /**
     * @param {ExtendedClient} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const allowedUserId = '769759712039796736'; // Ganti dengan ID Discord yang diizinkan

        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({
                content: '❌ Kamu tidak memiliki izin untuk menggunakan perintah ini.',
                ephemeral: true
            });
        }

        const channelId = '1384944936939425944'; // Channel target

        const currentDate = new Date().toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jakarta',
            hour12: false,
        }) + ' WIB';

        const gifLink = "https://media.discordapp.net/attachments/1373428066835103774/1385517851544129557/standard_2.gif?ex=68565b8d&is=68550a0d&hm=99064ecf1be5b2719f30906b74a73f5faca5190a8928c9bcea720dcb3d90fdfb&=";

        const offlineEmbed = new EmbedBuilder()
            .setColor(0xFF0000) // Merah
            .setTitle('⚠️ GANGGUAN SERVER SEMENTARA ⚠️')
            .setDescription(
                `Saat ini server mengalami gangguan teknis yang berdampak pada kestabilan layanan. Tim teknis kami sedang bekerja keras untuk segera menormalkan keadaan.\n\n` +
                `__**Status**__\n🔴 Server Mengalami Gangguan (Badai Teknis)\n\n` +
                `__**Perkiraan Pemulihan**__\n⏳ Masih dalam penanganan — informasi terbaru akan diumumkan secepatnya.\n\n` +
                `📅 ${currentDate} | 🙏 Terima kasih atas pengertian & kesabaran Anda.`
            )
            .setImage(gifLink);

        try {
            const targetChannel = client.channels.cache.get(channelId);
            if (!targetChannel) {
                return interaction.reply({
                    content: '❌ Channel tidak ditemukan. Cek kembali ID-nya.',
                    ephemeral: false
                });
            }

            await targetChannel.send({
                content: `@everyone`,
                embeds: [offlineEmbed]
            });

            await interaction.reply({
                content: `📛 Log: Status **OFFLINE** berhasil dikirim ke <#${channelId}>.`,
                ephemeral: false
            });

        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: '❌ Terjadi kesalahan saat mengirim status offline.',
                ephemeral: false
            });
        }
    }
};
