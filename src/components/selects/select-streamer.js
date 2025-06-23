const { StringSelectMenuInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'select-streamer',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const char = interaction.values;
        await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_Name = '${char}'`);
        MysqlGrand.query(`UPDATE player_characters SET streamer = '1000' WHERE Char_Name = '${char}'`);
        mek = interaction.update({
            content: `**SUCCESS** Streamer **${char}** berhasil di perbaiki!`,
            components: [],
            ephemeral: true,
        });
    }
};
