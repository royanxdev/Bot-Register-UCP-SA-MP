const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const bcrypt = require('bcrypt');
module.exports = {
    customId: 'modal-changepass',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {
        const password = interaction.fields.getTextInputValue('password_input');
        const confirmPassword = interaction.fields.getTextInputValue('confirm_password_input');
    
        if (password !== confirmPassword) {
            await interaction.reply({ content: ':x: Passwords do not match. Please try again.', ephemeral: true });
            return;
        }
    
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            await MysqlGrand.query('UPDATE playerucp SET password = ? WHERE DiscordID = ?', [hashedPassword, interaction.user.id]);
            await interaction.reply({ content: ':white_check_mark: Password berhasil di ganti!', ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: ':x: Gagal menganti password coba lagi nanti.', ephemeral: true });
        }
    }
};