const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');
const MysqlGrand = require('../../../../Mysql');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setadmin')
        .setDescription('Ubah level admin karakter berdasarkan nama.')
        .addStringOption(option =>
            option.setName('character')
                .setDescription('Nama karakter yang akan diubah status adminnya')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('rank')
                .setDescription('Level admin yang ingin diberikan')
                .setRequired(true)
        ),

    options: {
        ownerOnly: true,
        developers: true
    },

    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const charName = interaction.options.getString('character');
        const rank = interaction.options.getInteger('rank');

        if (rank < 0) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('FFFF00')
                        .setTitle('Gagal Mengatur Admin')
                        .setDescription('❌ Level admin tidak boleh negatif.')
                ]
            });
        }

        try {
            const [rows] = await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_Name = ?`, [charName]);

            if (rows.length === 0) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('FFFF00')
                            .setTitle('Karakter Tidak Ditemukan')
                            .setDescription(`❌ Karakter dengan nama \`${charName}\` tidak ditemukan.`)
                    ]
                });
            }

            await MysqlGrand.query(`UPDATE player_characters SET Char_Admin = ? WHERE Char_Name = ?`, [rank, charName]);

            const embed = new EmbedBuilder()
                .setColor('FFFF00')
                .setTitle('✅ Admin Berhasil Diperbarui')
                .setDescription([
                    `**Nama Karakter:** \`${charName}\``,
                    `**Level Admin Baru:** ${rank}`,
                    `**Diubah oleh:** <@${interaction.user.id}>`
                ].join('\n'))
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('FFFF00')
                        .setTitle('❌ Kesalahan Server')
                        .setDescription('Terjadi kesalahan saat memproses perintah.')
                ]
            });
        }
    }
};
