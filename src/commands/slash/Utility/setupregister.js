const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');
const { time } = require('../../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setupregist')
        .setDescription('setup register Nosterna.'),
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
            .setTitle("Nosterna User Panel Control")
            .setDescription('We have provided an option below to help you:')
            .setImage('https://media.discordapp.net/attachments/1390919203434921995/1390926324834631721/file_00000000461861f79a1905373381522f.png?ex=686a0896&is=6868b716&hm=3854770704138337a52f1e4abe2ca772ffcd65541119f44acafbebfcb9db487f&=&format=webp&quality=lossless&width=981&height=552')
            .addFields(
                { name: '__Register Account Button__', value: `> To create your UCP account, make sure you must have a verified member role to create an account.` },
                { name: '__Change Password Account Button__', value: `> To change your UCP account password if you forget your UCP password/account, use someone/two UCP ` },
                { name: '__Reverify Account Button__', value: `> To verify your Discord account that intentionally/accidentally left the Nosterna Roleplay discord, and you will get an account verification role to access all channels on our discord.` },
                { name: '__Bind Account Button__', value: `> To bind your UCP account if your discord is lost, and replace your discord account with a new one.` },
            )
            .setColor("FFFF00")
            .setFooter({ text: "Copyright (c) 2024 Nosterna Roleplay (All rights reversed)" })
            .setTimestamp();

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Register!')
                    .setStyle('Danger')
                    .setCustomId('button-register'),
                
                new ButtonBuilder()
                    .setLabel('Change Password!')
                    .setStyle('Primary')
                    .setCustomId('button-changepass'),
                
                new ButtonBuilder()
                    .setLabel('Reverif!')
                    .setStyle('Success')
                    .setCustomId('button-reverif'),

                new ButtonBuilder()
                    .setLabel('Bind!')
                    .setStyle('Secondary')
                    .setCustomId('button-bind')
            );

        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        await interaction.reply({ content: "Succes Create Embed HandleRegister", ephemeral: true });
    }
};
