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
        .setName('setvip')
        .setDescription('Set VIP pada karakter berdasarkan nama.')
        .addStringOption(option =>
            option.setName('character')
                .setDescription('Nama karakter yang ingin disetel VIP-nya')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('vip')
                .setDescription('Tipe VIP: 1, 2, 3')
                .addChoices(
                    { name: 'VIP Basic Access', value: 1 },
                    { name: 'VIP Pro Access', value: 2 },
                    { name: 'VIP Elite Access', value: 3 }
                )
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('days')
                .setDescription('Durasi VIP dalam hari (0 untuk permanent)')
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
        const vip = interaction.options.getInteger('vip');
        const days = interaction.options.getInteger('days');

        // Validasi durasi
        if (vip !== 0 && days < 7) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('FFFF00')
                        .setTitle('Gagal Menyetel VIP')
                        .setDescription('❌ Durasi VIP minimal adalah **7 hari**.')
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

            let vipTime = 0;

            if (vip !== 0) {
                const now = Math.floor(Date.now() / 1000); // Detik sekarang
                vipTime = now + (days * 24 * 60 * 60); // Tambah durasi
            }

            await MysqlGrand.query(
                `UPDATE player_characters SET Char_Vip = ?, Char_VipTime = ? WHERE Char_Name = ?`,
                [vip, vipTime, charName]
            );

            const embed = new EmbedBuilder()
                .setColor('FFFF00')
                .setTitle('✅ VIP Berhasil Disetel')
                .setDescription([
                    `**Nama Karakter:** \`${charName}\``,
                    `**Tipe VIP:** ${vip === 0 ? 'Permanent' : `VIP ${vip}`}`,
                    vip === 0
                        ? `**VIPTime:** Permanent`
                        : `**Durasi:** ${days} hari\n**Berakhir:** <t:${vipTime}:R>`,
                    `**Disetel oleh:** <@${interaction.user.id}>`
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
