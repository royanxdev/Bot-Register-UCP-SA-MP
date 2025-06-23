const { ChatInputCommandInteraction, ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('donation')
        .setDescription('Show List Donate'),
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
            //.setImage('https://media.discordapp.net/attachments/1204061404940865567/1297578151378944080/20241020_221016.png?ex=67166f53&is=67151dd3&hm=4a99b1338321239076abbc9f7405815c5e3c9076b0cbbfbb5a84180c9ea3fd60&')
            .setDescription(`Press the button below to see the list of benefits provided by the Grand Alternative Roleplay team.`)
            .setColor("FFFF00")
            .setImage("https://cdn.discordapp.com/attachments/1245769174752563312/1310983469320638615/IMG-20241126-WA0493.jpg?ex=6747dcbf&is=67468b3f&hm=e0b144268a5f9385aa577a9d884fac4af584ff3fccca4bd19c71d087c710841d&")
            //.setImage("https://media.discordapp.net/attachments/1204061404940865567/1284485628289093746/Proyek_Baru_34_F4DEED5.gif?ex=66e6cdf6&is=66e57c76&hm=b4d9feb2cfdb10cf11cf8f1f20e89268ccd282024874154629e42f8c7e16d58d&=&width=646&height=363")
            .setFooter({ text: "© Copyright Nosterna Community"});

        const select = new StringSelectMenuBuilder()
			.setCustomId('select-donate')
			.setPlaceholder('Select Donate')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('About Donate')
					.setDescription('About Donate Community')
					.setValue('AboutDonate'),
                    // .setEmoji('<:icons_info:1255688561844293664>'),
                new StringSelectMenuOptionBuilder()
					.setLabel('House Donate')
					.setDescription('Price House Donate')
					.setValue('HouseDonate'),
                    // .setEmoji('<:icon_house:1284691160408920166>'),
				// new StringSelectMenuOptionBuilder()
				// 	.setLabel('Bisnis Donate')
				// 	.setDescription('Price Bisnis Donate')
				// 	.setValue('BisnisDonate')
                //     .setEmoji('<:icons_box:1284691892138672199>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Vip Donate')
					.setDescription('Price Vip Donate')
					.setValue('VipDonate'),
                    // .setEmoji('<:VIP_Icon:1284692004495949867>'),
                new StringSelectMenuOptionBuilder()
					.setLabel('Other Donate')
					.setDescription('Price Other Donate')
					.setValue('OtherDonate')
                    // .setEmoji('<:icons_list:1255689065408237671>')
            );
            const row = new ActionRowBuilder()
			.addComponents(select);

        await interaction.channel.send({ embeds: [msgEmbed], components: [row] });
        return interaction.reply({ content: "Succes Create Embed List Donate", ephemeral: true });
    }
};
