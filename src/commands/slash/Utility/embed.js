const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');
const { time } = require('../../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Test The Embed.')
        .addStringOption(option => option
				.setName('deskripsi')
				.setDescription('The deskripsi'))
		.addStringOption(option => option
				.setName('tetle')
				.setDescription('The Title'))
		.addChannelOption(option => option
				.setName('channel')
				.setDescription('The channel to echo into')),
    options: {
        ownerOnly: true,
        developers: true
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
    	const descriptioni = interaction.options.getString('deskripsi') ?? 'No Description';
        const title = interaction.options.getString('tetle') ?? 'No Title';
        const chennelembed = interaction.options.getChannel('channel');
    
        const msgEmbed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(descriptioni)
            .setColor('FFFF00')
            .setFooter({ text: "Copyright (c) 2025 Nosterna Roleplay (All rights reserved)." })
            .setTimestamp();

        chennelembed.send({ embeds: [msgEmbed] });
        return interaction.reply({ content: "Succes Create Embed", ephemeral: true });
    }
};
