const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('rating-staff')
        .setDescription('staff rating to Nosterna')
        .addUserOption(option => option
                .setName('staff')
                .setDescription('staff who have sold goods to you')
                .setRequired(true))
        .addStringOption(option => option
                .setName('rate')
                .setDescription('Rate for staff who serve you')
                .setAutocomplete(true)
                .setRequired(true))
        .addStringOption(option => option
				.setName('ulasan')
				.setDescription('Leave a review for the staff who serve you')
				.setRequired(true)),
    options: {
        public: true
    },
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
    
    	const staff = interaction.options.getUser('staff');
        const ratings = interaction.options.getString('rate');
        const ulasan = interaction.options.getString('ulasan');
        const chennel = interaction.guild.channels.cache.get('1371439386214006915');
        
        const embed = new EmbedBuilder()
           .setDescription(`**__Rating Staff__**\nThank you for providing input to our staff, we will try our best to be the best.`)
           .addFields(
	          	{ name: `Nama Staff`, value: `> ${staff}` },
		          { name: `Rating`, value: `> ${ratings}` },
		          { name: `Ulasan`, value: `> ${ulasan}` },
           )
           //.setImage('https://media.discordapp.net/attachments/1204061404940865567/1290146413396885546/20240930_100057.png?ex=66fb65fa&is=66fa147a&hm=cd3bdf470bc64a7cba5fd3d7a2fd9e273c26d27692c60e11a8382b932970b5f9&')
           .setColor("FFFF00")
           //.setImage('https://media.discordapp.net/attachments/1258433114858983505/1259021078081310740/20240706_123942.png?ex=668a2a40&is=6688d8c0&hm=7cb7f537dff74e6e7cc75ef728865f37933141b1d8c226551dc68812944fe221&=&format=webp&quality=lossless&width=1236&height=241')
           .setFooter({ text: interaction.user.username });

        chennel.send({ embeds: [embed] });
        return interaction.reply({ content: "Thank you for rating the Nosterna server, hopefully it will become an advanced server", ephemeral: true });
    }
};
