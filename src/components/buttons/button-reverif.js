const {
    ButtonInteraction,
    EmbedBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-reverif',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            // Cek database
            const [rows] = await MysqlGrand.query('SELECT * FROM playerucp WHERE DiscordID = ?', [interaction.user.id]);

            if (rows.length === 0) {
                return await interaction.reply({
                    content: ":x: If you don't have a UCP account, please register first",
                    ephemeral: true,
                });
            }

            // Siapkan embed
            const embed = new EmbedBuilder()
                .setTitle('Re-Verification Successful')
                .setDescription('You have been verified again on the Nosterna Roleplay server!')
                .addFields(
                    { name: '> User Control Panel', value: `\`\`\`\n${rows[0].ucp}\n\`\`\``, inline: false },
                    { name: '> Discord ID', value: `\`\`\`\n${rows[0].DiscordID}\n\`\`\``, inline: false },
                )
                .setImage('https://media.discordapp.net/attachments/1204061404940865567/1316592382145331241/Tanpa_judul_1080_x_258_piksel_5.png?ex=675b9bb5&is=675a4a35&hm=e81048054d4f25244ee3d1fc7219223b96bc1e3d6a3311932e3198e8070f202d&=&format=webp&quality=lossless&width=1025&height=245')
                .setColor('FFFF00')
                .setFooter({ text: 'Copyright (c) 2024 Nosterna Roleplay (All rights reserved)' })
                .setTimestamp();

            // Reply lebih dulu untuk menghindari error interaction kadaluarsa
            await interaction.reply({
                content: ':white_check_mark: Re-Verification successful! Please check your DM.',
                ephemeral: true,
            });

            // Kirim embed ke DM user (tapi tangani jika gagal)
            try {
                await interaction.user.send({
                    content: `Hello <@${interaction.user.id}>`, embeds: [embed]
                });
            } catch (dmError) {
                console.warn(`Gagal mengirim DM ke ${interaction.user.tag}`);
                await interaction.followUp({
                    content: ':warning: Gagal mengirim DM. Pastikan Anda mengaktifkan pesan dari server.',
                    ephemeral: true,
                });
            }
        } catch (err) {
            console.error('Terjadi error di button-reverif:', err);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: ':x: Terjadi kesalahan saat memproses verifikasi ulang.',
                    ephemeral: true,
                });
            }
        }
    }
};
