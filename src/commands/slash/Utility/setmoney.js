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
        .setName('setmoney')
        .setDescription('Tambahkan uang ke karakter berdasarkan nama karakter.')
        .addStringOption(option =>
            option.setName('character')
                .setDescription('Nama karakter yang ingin ditambahkan uang')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Jumlah uang yang ingin ditambahkan')
                .setRequired(true)
        ),

    options: {
        ownerOnly: true,
        developers: true
    },

    /**
     * 
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
                        .setTitle('Gagal Menambahkan Uang')
                        .setDescription('❌ Jumlah uang harus lebih dari 0.')
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
                            .setDescription(`❌ Tidak ditemukan karakter dengan nama \`${charName}\`.`)
                    ]
                });
            }

            const currentMoney = rows[0].Char_Money || 0;
            const newMoney = currentMoney + amount;

            await MysqlGrand.query(`UPDATE player_characters SET Char_Money = ? WHERE Char_Name = ?`, [newMoney, charName]);

            const embed = new EmbedBuilder()
                .setColor('FFFF00')
                .setTitle('💰 Uang Berhasil Ditambahkan')
                .setDescription([
                    `**Nama Karakter:** \`${charName}\``,
                    `**Uang Ditambahkan:** $${amount.toLocaleString()}`,
                    `**Total Sekarang:** $${newMoney.toLocaleString()}`,
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
