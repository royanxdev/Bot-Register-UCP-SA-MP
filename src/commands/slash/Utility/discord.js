const { ChatInputCommandInteraction, ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('discord')
        .setDescription('Show List Discord'),
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
            .setTitle('Nosterna | Community ')
            //.setThumbnail(config.icon.thumbnail)
            .setImage('https://cdn.discordapp.com/attachments/1245769174752563312/1310983469320638615/IMG-20241126-WA0493.jpg?ex=6747dcbf&is=67468b3f&hm=e0b144268a5f9385aa577a9d884fac4af584ff3fccca4bd19c71d087c710841d&')
            .setDescription(`Official discord Nosterna roleplay samp Community, press select menu to see the official discord Nosterna`)
            .setColor("FFFF00")
            //.setImage("https://media.discordapp.net/attachments/1204061404940865567/1284485628289093746/Proyek_Baru_34_F4DEED5.gif?ex=66e6cdf6&is=66e57c76&hm=b4d9feb2cfdb10cf11cf8f1f20e89268ccd282024874154629e42f8c7e16d58d&=&width=646&height=363")
            .setFooter({ text: "© Copyright Nosterna Community"});

        const select = new StringSelectMenuBuilder()
			.setCustomId('select-discord')
			.setPlaceholder('Select Discord')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Nosterna Family and Gang')
					.setDescription('Official Discord FnG')
					.setValue('FnG')
                    .setEmoji('<:emoji_85:1311008482484420681>'),
                // new StringSelectMenuOptionBuilder()
				// 	.setLabel('Nosterna Goverment Departement')
				// 	.setDescription('Official Discord Faction')
				// 	.setValue('sgs')
                //     .setEmoji('<:emoji_86:1311008590290747462>'),
                // new StringSelectMenuOptionBuilder()
				// 	.setLabel('Nosterna News Departement')
				// 	.setDescription('Official Discord Faction')
				// 	.setValue('sna')
                //     .setEmoji('<:emoji_89:1311009895251972237>'),
                // new StringSelectMenuOptionBuilder()
				// 	.setLabel('Nosterna Cafe Food')
				// 	.setDescription('Official Discord Faction')
				// 	.setValue('scf')
                //     .setEmoji('<:emoji_87:1311008742619480146>'),
                // new StringSelectMenuOptionBuilder()
				// 	.setLabel('Nosterna Medical Departement')
				// 	.setDescription('Official Discord Faction')
				// 	.setValue('smd')
                //     .setEmoji('<:emoji_86:1311008673883095050>')
            );
            const row = new ActionRowBuilder()
			.addComponents(select);

        await interaction.channel.send({ embeds: [msgEmbed], components: [row] });
        return interaction.reply({ content: "Succes Create Embed List Discord", ephemeral: true });
    }
};