const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const { EmbedBuilder } = require('discord.js');
const components = require('../../handlers/components');

module.exports = {
    customId: 'select-virtualworld',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const char = interaction.values;
        await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_Name = '${char}'`);
        MysqlGrand.query(`UPDATE player_characters SET Char_IntID = '0', Char_WID = '0' WHERE Char_Name = '${char}'`);
        mek = interaction.update({
            content: `**SUCCESS** Virtual **${char}** berhasil di ubah!`,
            components: [],
            ephemeral: true,
        });
    }
};