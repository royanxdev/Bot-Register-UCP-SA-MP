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
            .setImage('https://media.discordapp.net/attachments/1390919203434921995/1390926324834631721/file_00000000461861f79a1905373381522f.png?ex=686a0896&is=6868b716&hm=3854770704138337a52f1e4abe2ca772ffcd65541119f44acafbebfcb9db487f&=&format=webp&quality=lossless&width=981&height=552')
            .addFields(
                { name: '__Stremaer Settings__', value: `> To be used if the player experiences fore close/fc, this can help you and make object rendering easier on a step by step basis` },
                { name: '__Delete Character__', value: `> To be used to delete a character, use it if the character has an error or has a non-rp name. You can delete the character by pressing the button below` },
                { name: '__Configuration Location__', value: `> To be used to change your character's Interior ID and Virtual World ID, allowing flexible environment customization without needing to enter the game` }
            )
            .setColor("FFFF00")
            .setFooter({ text: "Copyright (c) 2024 Nosterna Roleplay (All rights reversed)" })
            .setTimestamp();

        const buttons = new ActionRowBuilder()
            .addComponents(
                 new ButtonBuilder()
                     .setLabel('Streamer settings!')
                     .setStyle('Secondary')
                     .setCustomId('button-streamer'),

                new ButtonBuilder()
                    .setLabel('Delete character!')
                    .setStyle('Primary')
                    .setCustomId('button-deletechar'),

                new ButtonBuilder()
                    .setLabel('Configuration Location!')
                    .setStyle('Success')
                    .setCustomId('button-virtualworld')
            );

        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        await interaction.reply({ content: "Succes Create Embed SetupChar", ephemeral: true });
    }
};