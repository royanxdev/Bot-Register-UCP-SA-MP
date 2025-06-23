const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');
const { time } = require('../../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setupsupp')
        .setDescription('setup support.'),
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
            .setImage('https://media.discordapp.net/attachments/1323587126071394398/1323815011381936269/Tanpa_judul_1080_x_258_piksel_3.png?ex=6775e24e&is=677490ce&hm=43424a77765d717f5cd0287dd298f21b630d3133812bea42e34801330cc82bb1&=&format=webp&quality=lossless&width=550&height=131')
            .addFields(
                // { name: '__Character Story__', value: `> To create a story character for your character, please fill it in correctly, and wait for the admin to approve/danify your story character.` },
                // { name: '__Character Killed__', value: `> To turn off your character, please fill in the format given by the bot correctly, and wait for the announcement from the admin to approve/danify your character as killed.` },
                { name: '__Reports Bugs__', value: `> To report bugs that occur in-game, please fill in the format correctly so that the developer can fix the bugs quickly.` },
                { name: '__Suggestions__', value: `> To provide suggestions/criticism to the server, please provide criticism/suggestions to the server so that the server becomes a better community than before.` },
            )
            .setColor("FFFF00")
            .setFooter({ text: "Copyright (c) 2024 Nosterna Roleplay (All rights reversed)" })
            .setTimestamp();

        const buttons = new ActionRowBuilder()
            .addComponents(

                // new ButtonBuilder()
                //     .setLabel('Character Story!')
                //     .setStyle('Primary')
                //     .setCustomId('button-cs'),

                // new ButtonBuilder()
                //     .setLabel('Character Killed!')
                //     .setStyle('Secondary')
                //     .setCustomId('button-ck'),

                new ButtonBuilder()
                    .setLabel('Reports Bugs!')
                    .setStyle('Danger')
                    .setCustomId('button-reportbug'),

                new ButtonBuilder()
                    .setLabel('Suggestions!')
                    .setStyle('Success')
                    .setCustomId('button-saran'),
            );

        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        return interaction.reply({ content: "Succes Create Embed Setup Support", ephemeral: true });
    }
};