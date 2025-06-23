const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
module.exports = {
    customId: 'modal-bind',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {
    const ucpName = interaction.fields.getTextInputValue('ucp_name_input');
    const otp = interaction.fields.getTextInputValue('otp_input');
    const { user } = interaction;

    try {
      const [rows] = await MysqlGrand.execute('SELECT * FROM playerucp WHERE ucp = ? AND verifycode = ?', [ucpName, otp]);
      if (rows.length === 0) {
        return interaction.reply({ content: ':x: Invalid UCP name or OTP/PIN!', ephemeral: true });
      }
  
      const [linkedRows] = await MysqlGrand.execute('SELECT * FROM playerucp WHERE DiscordID = ?', [user.id]);
      if (linkedRows.length > 0) {
        return interaction.reply({ content: ':x: Your Discord account is already linked to another UCP account. Please use the Reverif button if you need to re-verify.', ephemeral: true });
      }
      
      await MysqlGrand.execute('UPDATE playerucp SET DiscordID = ? WHERE ucp = ?', [user.id, ucpName]);
      interaction.reply({ content: ':white_check_mark: UCP account successfully bound to your Discord account!', ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: ':x: There was an error binding your UCP account.', ephemeral: true });
    }
}};