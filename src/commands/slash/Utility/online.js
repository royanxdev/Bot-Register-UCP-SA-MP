const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('online')
        .setDescription('Menampilkan status bahwa Nosterna Roleplay sedang online'),

    /**
     * @param {ExtendedClient} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const allowedUserId = '769759712039796736'; // Hanya user ini yang diizinkan
        const channelId = '1384944936939425944';    // Channel tujuan kirim notifikasi

        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({
                content: '❌ Kamu tidak memiliki izin untuk menggunakan perintah ini.',
                ephemeral: true
            });
        }

        const serverName = "🌐 Nosterna Roleplay";
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

        const gifUrl = 'https://media.discordapp.net/attachments/1373428066835103774/1385518604509904996/standard_3.gif';

        const onlineEmbed = new EmbedBuilder()
            .setColor(0x26A65B)
            .setTitle('🌟 SERVER TELAH KEMBALI ONLINE 🌟')
            .setDescription(
                `Dengan bangga kami umumkan bahwa server telah kembali beroperasi secara normal dan siap digunakan.\n` +
                `Terima kasih atas kesabaran dan dukungan Anda selama proses pemeliharaan berlangsung.\n\n` +
                `__**Status**__\n🟢 **Server Online & Stabil**\n\n` +
                `__**Informasi Tambahan**__\n🔧 Semua sistem telah dipulihkan dan berjalan sebagaimana mestinya.\n\n` +
                `🕒 ${getTimeNow()} | 🙏 Kami sangat menghargai kesetiaan Anda.`
            )
            .setImage(gifUrl);

        try {
            await interaction.deferReply({ ephemeral: true });

            const targetChannel = client.channels.cache.get(channelId);
            if (!targetChannel) {
                return await interaction.editReply({
                    content: '❌ Channel tidak ditemukan. Pastikan ID channel benar!'
                });
            }

            await targetChannel.send({
                content: `@everyone`,
                embeds: [onlineEmbed]
            });

            await interaction.editReply({
                content: `📢 Log: Status Online berhasil diumumkan di <#${channelId}>.`
            });

        } catch (error) {
            console.error('❌ Error saat kirim embed online:', error);

            // Hindari error Unknown Interaction
            if (interaction.deferred || interaction.replied) {
                await interaction.followUp({
                    content: '❌ Gagal mengumumkan status online.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '❌ Gagal mengumumkan status online.',
                    ephemeral: true
                });
            }
        }
    }
};
