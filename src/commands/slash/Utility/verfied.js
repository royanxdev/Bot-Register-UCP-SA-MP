const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');
const { time } = require('../../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('verfied')
        .setDescription('setup verfied Nosterna.'),
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
            .setTitle("Nosterna Verfikasi")
            .setDescription('TPress the button below to verify your account on the Nosterna roleplay server, the purpose of this verification is to prevent double discord, bots entering, and new discord accounts')
            .setImage('https://media.discordapp.net/attachments/1373191147668639845/1373421500790607952/testhsad.png?ex=682a59f2&is=68290872&hm=808213031f80fdf6ae22b324ab9e96f2403d85a7a0672586711e647ede6fd24a&=&format=webp&quality=lossless')
            .setColor("FFFF00")
            .setFooter({ text: "Copyright (c) 2024 Nosterna Roleplay (All rights reversed)" })
            .setTimestamp();

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Verfikasi Discord!')
                    .setStyle('Danger')
                    .setCustomId('button-verifed')
            );

        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        await interaction.reply({ content: "Succes Create Embed Verfikasi", ephemeral: true });
    }
};