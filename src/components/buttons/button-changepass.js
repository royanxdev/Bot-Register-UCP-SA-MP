const { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-changepass',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const [rows] = await MysqlGrand.query(`SELECT ucp FROM playerucp WHERE DiscordID = '${interaction.user.id}'`);

        if (rows.length === 0) {
            await interaction.reply({ content: ':x: Tidak di temukan account ucp anda yang terkait dengan discord', ephemeral: true });
        } else {
        const modals = new ModalBuilder()
            .setCustomId('modal-changepass')
            .setTitle(`Change Password! UCP`);

        const passwordInput = new TextInputBuilder()
            .setCustomId('password_input')
            .setLabel('New Password')
            .setPlaceholder('Input Valid UCP Password')
            .setStyle(TextInputStyle.Short)
            .setMaxLength(24)
            .setMinLength(8)
            .setRequired(true);

        const confirmPasswordInput = new TextInputBuilder()
            .setCustomId('confirm_password_input')
            .setLabel('New Password Confirmation')
            .setPlaceholder('Re-Input Valid UCP Password')
            .setStyle(TextInputStyle.Short)
            .setMaxLength(24)
            .setMinLength(8)
            .setRequired(true);

        modals.addComponents(
        new ActionRowBuilder().addComponents(passwordInput),
        new ActionRowBuilder().addComponents(confirmPasswordInput))
        interaction.showModal(modals);
        }
    }
};
