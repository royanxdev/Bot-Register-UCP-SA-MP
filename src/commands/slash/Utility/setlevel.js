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
        .setName('setlevel')
        .setDescription('Tambah level karakter berdasarkan nama.')
        .addStringOption(option =>
            option.setName('character')
                .setDescription('Nama karakter yang ingin ditambahkan level')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Jumlah level yang ingin ditambahkan')
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
        const amount = interaction.options.getInteger('amount');    

        if (amount <= 0) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('FFFF00')
                        .setTitle('Gagal Menambahkan Level')
                        .setDescription('❌ Jumlah level harus lebih dari 0.')
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

            const player = rows[0];
            const newLevel = player.Char_Level + amount;

            await MysqlGrand.query(`UPDATE player_characters SET Char_Level = ? WHERE Char_Name = ?`, [newLevel, charName]);

            const embed = new EmbedBuilder()
                .setColor('FFFF00')
                .setTitle('✅ Level Berhasil Ditambahkan')
                .setDescription([
                    `**Nama Karakter:** \`${charName}\``,
                    `**Jumlah Ditambahkan:** +${amount}`,
                    `**Level Sekarang:** ${newLevel}`,
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
