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

        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({
                content: '❌ Kamu tidak memiliki izin untuk menggunakan perintah ini.',
                ephemeral: true
            });
        }

        const serverName = "🌐 Nosterna Roleplay";
        const channelId = '1384944936939425944';

        const currentDate = new Date().toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jakarta',
            hour12: false,
        }) + ' WIB';

        const gifUrl = 'https://media.discordapp.net/attachments/1373428066835103774/1385518604509904996/standard_3.gif?ex=68565c41&is=68550ac1&hm=ee8b49ec801ea280e324338e707baa0a3ac47b0d5629ca0977dd1ca265d9a8b7&';

        const onlineEmbed = new EmbedBuilder()
            .setColor(0x26A65B)
            .setTitle('🌟 SERVER TELAH KEMBALI ONLINE 🌟')
            .setDescription(
                `Dengan bangga kami umumkan bahwa server telah kembali beroperasi secara normal dan siap digunakan.\n` +
                `Terima kasih atas kesabaran dan dukungan Anda selama proses pemeliharaan berlangsung.\n\n` +
                `__**Status**__\n🟢 **Server Online & Stabil**\n\n` +
                `__**Informasi Tambahan**__\n🔧 Semua sistem telah dipulihkan dan berjalan sebagaimana mestinya.\n\n` +
                `🕒 ${currentDate} | 🙏 Kami sangat menghargai kesetiaan Anda.`
            )
            .setImage(gifUrl);

        try {
            const targetChannel = client.channels.cache.get(channelId);
            if (!targetChannel) {
                return interaction.reply({
                    content: '❌ Channel tidak ditemukan. Pastikan ID channel benar!',
                    ephemeral: false
                });
            }

            await targetChannel.send({
                content: `@everyone`,
                embeds: [onlineEmbed]
            });

            await interaction.reply({
                content: `📢 Log: Status Online berhasil diumumkan di <#${channelId}>.`,
                ephemeral: false
            });

        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: '❌ Terjadi kesalahan saat mengirim status online.',
                ephemeral: false
            });
        }
    }
};
