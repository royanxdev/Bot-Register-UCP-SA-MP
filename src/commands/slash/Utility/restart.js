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
        // Configuration
        const allowedUserId = '769759712039796736';
        const channelId = '1384944936939425944';
        const restartGif = 'https://media.discordapp.net/attachments/1373428066835103774/1385527296768610344/standard_4.gif';
        const onlineGif = 'https://media.discordapp.net/attachments/1373428066835103774/1385518604509904996/standard_3.gif';
        const restartDuration = 120000; // 2 minutes in ms

        // Permission check
        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({
                content: '❌ Kamu tidak memiliki izin untuk menggunakan perintah ini.',
                ephemeral: true
            });
        }

        // Helper function for formatted time
        const getTimeNow = () => {
            return new Date().toLocaleString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Jakarta',
                hour12: false,
            }) + ' WIB';
        };

        // Create embeds
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
            .setImage(restartGif);

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
            .setImage(onlineGif);

        try {
            // Defer reply to avoid timeout
            await interaction.deferReply({ ephemeral: true });

            // Get channel and validate
            const targetChannel = await client.channels.fetch(channelId).catch(() => null);
            if (!targetChannel) {
                return await interaction.editReply({
                    content: '❌ Channel tidak ditemukan. Pastikan ID channel benar dan bot memiliki akses!'
                });
            }

            // Send restart notification
            await targetChannel.send({ 
                content: '@everyone', 
                embeds: [restartEmbed] 
            });

            // Confirm success
            await interaction.editReply({
                content: '✅ Notifikasi restart berhasil dikirim. Notifikasi online akan dikirim secara otomatis dalam 2 menit.'
            });

            // Schedule online notification
            setTimeout(async () => {
                try {
                    await targetChannel.send({ 
                        content: '@everyone', 
                        embeds: [onlineEmbed] 
                    });
                    console.log(`✅ Status online berhasil dikirim ke channel ${channelId}`);
                } catch (error) {
                    console.error('❌ Gagal mengirim notifikasi online:', error);
                    // Try to notify command user about the failure
                    interaction.followUp({
                        content: '⚠️ Gagal mengirim notifikasi online. Silakan kirim manual.',
                        ephemeral: true
                    }).catch(console.error);
                }
            }, restartDuration);

        } catch (error) {
            console.error('❌ Error saat menjalankan command restart:', error);
            
            // Error handling with proper interaction state check
            if (interaction.deferred || interaction.replied) {
                await interaction.followUp({
                    content: '❌ Gagal mengirim notifikasi restart. Silakan coba lagi atau hubungi developer.',
                    ephemeral: true
                }).catch(console.error);
            } else {
                await interaction.reply({
                    content: '❌ Gagal mengirim notifikasi restart. Silakan coba lagi atau hubungi developer.',
                    ephemeral: true
                }).catch(console.error);
            }
        }
    }
};