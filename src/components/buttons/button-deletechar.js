const { ButtonInteraction, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-deletechar',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const [res] = await MysqlGrand.query(`
            SELECT pc.Char_Name, pc.Char_Level, pc.pID, pc.Char_UCP
            FROM player_characters pc
            JOIN playerucp pu ON pu.ucp = pc.Char_UCP
            WHERE pu.DiscordID = ?`, [interaction.user.id]);

        // Jika karakter ditemukan
        if (res.length > 0) {
            const select = new StringSelectMenuBuilder()
                .setCustomId('select-deletechar') // digunakan untuk deteksi pilihan selanjutnya
                .setPlaceholder('Select Your Character!');

            // Tambahkan semua karakter ke dalam opsi dropdown
            for (let i = 0; i < res.length; i++) {
            select.addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(`${res[i].Char_Name}`) // Nama karakter yang ditampilkan
                .setValue(`${res[i].Char_Name}`) // Nilai yang dikirim saat dipilih
                .setDescription(`UCP: ${res[i].Char_UCP} | Level: ${res[i].Char_Level}`) // Info tambahan
            );
        }

        // Bungkus komponen ke dalam action row
        const row = new ActionRowBuilder().addComponents(select);

        return interaction.reply({
            content: 'Choose your Character!',
            components: [row],
            ephemeral: true
        });
    } else {
        return interaction.reply({
            content: '❎ - You haven\'t registered an charcter yet',
            ephemeral: true
        });
    }
}
}