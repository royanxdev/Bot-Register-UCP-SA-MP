const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('changelogs')
        .setDescription('Update Logs')
        .addStringOption(option => option
                .setName('updates')
                .setDescription('updates server')
                .setRequired(true))
        .addStringOption(option => option
                .setName('fixed')
                .setDescription('fixed server')
                .setRequired(true))
        .addStringOption(option => option
                .setName('version')
                .setDescription('version server')
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
        const changed = interaction.options.getString('updates');
        const fixesImprovement = interaction.options.getString('fixed');
    	const version = interaction.options.getString('version');

		//const channelUpdate = await client.channels.fetch(process.env.UPDATE_CHANNEL_ID);
		const updateChannelId = '1384944944145371249';
		
		const currentDate = new Date();
		const options = { 
		    year: 'numeric', 
		    month: 'long', 
		    day: 'numeric', 
		    hour: 'numeric', 
		    minute: 'numeric', 
		    timeZone: 'Asia/Jakarta',
		    hour12: false
		};
		const formattedDate = currentDate.toLocaleDateString('id-ID', options);
		const finalDate = `${formattedDate} WIB`;

		const userAvatar = interaction.user.displayAvatarURL({ dynamic: true, size: 32 });
		
		try {
		   const ownerRole = interaction.guild.roles.cache.find(role => role.name === 'Developer Server');
		   if (!interaction.member.roles.cache.has(ownerRole.id)) {
		       await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
		       return;
	     }
         const changelogEmbed = new EmbedBuilder()
            .setColor(0x0AFAA5)
            .setTitle(`Changelogs v${version}`)
            .addFields(
                { name: '__Changes__', value: `${changed}` },
                { name: '__Fixes & Improvement__', value: `${fixesImprovement}` },
            )
            //.setImage('https://media.discordapp.net/attachments/1204061404940865567/1297857246641782835/20241021_161149.png?ex=67177340&is=671621c0&hm=dabfcc10cdd32712bd16d3a62630ed0fb3715987b6d66bce5c252b514b27a282&')
            .setFooter({ text: `__*Update pada ${finalDate}*__` , iconURL: userAvatar });

		const channelPatchUpdate = client.channels.cache.get(updateChannelId);
		
		if (channelPatchUpdate) {
	        await channelPatchUpdate.send({ embeds: [changelogEmbed] });
	        await interaction.reply({ content: 'The update has been successfully sent to <#1384944944145371249>' });
        } else {
	        console.error('Channel id tidak di temukan');
        }
      } catch (error) {
      console.error(error);
      return interaction.reply({ content: 'An error occurred while interacting.', ephemeral: true });
    }
}};