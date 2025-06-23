const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');
const { time } = require('../../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setupchar')
        .setDescription('setup character.'),
    options: {
        ownerOnly: true,
        developers: true
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const msgEmbed = new EmbedBuilder()
            .setTitle("Nosterna Account Support")
            .setDescription('We have provided an option below to help you:')
            .setImage('https://media.discordapp.net/attachments/1373178932903542894/1373498325403304016/standard_4.gif?ex=682aa17f&is=68294fff&hm=99dbfeb4688661c1b702f7c4543bb55f98763e6db910cd7e113a0333ccfc53d4&=')
            .addFields(
                // { name: '__Stremaer Settings__', value: `> to be used if the player experiences fore close/fc, this can help you and make object rendering easier on a step by step basis` },
                { name: '__Delete Character__', value: `> To be used to delete a character, use it if the character has an error or has a non-rp name. You can delete the character by pressing the button below` },
                { name: '__Display Character__', value: `> to be used to display your character, if you want to take a screenshot but are too lazy to enter the game, you can take a screen shot using this feature` }
            )
            .setColor("FFFF00")
            .setFooter({ text: "Copyright (c) 2024 Nosterna Roleplay (All rights reversed)" })
            .setTimestamp();

        const buttons = new ActionRowBuilder()
            .addComponents(
                // new ButtonBuilder()
                //     .setLabel('Streamer settings!')
                //     .setStyle('Secondary')
                //     .setCustomId('button-streamer'),

                new ButtonBuilder()
                    .setLabel('Delete character!')
                    .setStyle('Primary')
                    .setCustomId('button-deletechar'),

                new ButtonBuilder()
                    .setLabel('Display character!')
                    .setStyle('Success')
                    .setCustomId('button-stats')
            );

        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        await interaction.reply({ content: "Succes Create Embed SetupChar", ephemeral: true });
    }
};