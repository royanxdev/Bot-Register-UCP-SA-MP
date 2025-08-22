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
        const allowedUserId = '769759712039796736';
        const channelId = '1384944936939425944';

        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({
                content: '❌ Kamu tidak memiliki izin untuk menggunakan perintah ini.',
                ephemeral: true
            });
        }

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

        const gifLink = "https://media.discordapp.net/attachments/1373428066835103774/1385517851544129557/standard_2.gif";

        const offlineEmbed = new EmbedBuilder()
            .setColor(0xFF0000) // Merah
            .setTitle('⚠️ GANGGUAN SERVER SEMENTARA ⚠️')
            .setDescription(
                `Saat ini server mengalami gangguan teknis yang berdampak pada kestabilan layanan. Tim teknis kami sedang bekerja keras untuk segera menormalkan keadaan.\n\n` +
                `__**Status**__\n🔴 **Server Mengalami Gangguan (Badai Teknis)**\n\n` +
                `__**Perkiraan Pemulihan**__\n⏳ Masih dalam penanganan — informasi terbaru akan diumumkan secepatnya.\n\n` +
                `📅 ${getTimeNow()} | 🙏 Terima kasih atas pengertian & kesabaran Anda.`
            )
            .setImage(gifLink);

        try {
            await interaction.deferReply({ ephemeral: true });

            const targetChannel = client.channels.cache.get(channelId);
            if (!targetChannel) {
                return await interaction.editReply({
                    content: '❌ Channel tidak ditemukan. Cek kembali ID-nya.'
                });
            }

            await targetChannel.send({
                content: `@everyone`,
                embeds: [offlineEmbed]
            });

            await interaction.editReply({
                content: `📛 Log: Status **OFFLINE** berhasil dikirim ke <#${channelId}>.`
            });

        } catch (error) {
            console.error('❌ Terjadi kesalahan saat mengirim status offline:', error);

            // Hindari Unknown Interaction
            if (interaction.deferred || interaction.replied) {
                await interaction.followUp({
                    content: '❌ Gagal mengirim status offline.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '❌ Gagal mengirim status offline.',
                    ephemeral: true
                });
            }
        }
    }
};
