const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const { EmbedBuilder } = require('discord.js');
const components = require('../../handlers/components');

module.exports = {
    customId: 'select-stats',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const char = interaction.values;
    //const [row] = await MysqlGrand.query(`SELECT * FROM users WHERE DiscordID = '${interaction.user.id}'`);
        const [row] = await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_Name = '${char}'`);
        const msgrow = new EmbedBuilder()
            .setAuthor({ name: `Statistik Players ${char}` })
            .setColor("FFFF00")
            .setDescription(`**__Data Karakter__** \n\nName: ${char}\nUcp: ${row[0].Char_UCP}\nVIP Level: ${row[0].Char_Vip}\nVIP Time: ${row[0].Char_VipTime} days\nAge: ${row[0].Char_Age}\nName Chatrick: ${row[0].CharTwitterName}\nMask ID: ${row[0].Char_MaskID}\nPhone Number: ${row[0].Char_PhoneNum}\nUang: ${row[0].Char_Money}\nSaldo Bank: ${row[0].Char_BankMoney}\nRekening Bank: ${row[0].Char_BankRek}\nDarah: ${row[0].Char_Health}\nArmor: ${row[0].Char_Armour}\nLapar: ${row[0].Char_Hunger}\nHaus: ${row[0].Char_Thirst}\nStress: ${row[0].Char_Stress}\nExp: ${row[0].Char_LevelUp}\nKepala: ${row[0].Char_Head}\nPerut: ${row[0].Char_Stomach}\nTangan Kanan: ${row[0].Char_RightArm}\nTangan Kiri: ${row[0].Char_LeftArm}\nKaki Kanan: ${row[0].Char_RightFoot}\nKaki Kiri: ${row[0].Char_LeftFoot}\nLevel: ${row[0].Char_Level}`)
            .setFooter({ text: "Copyright (c) 2024 Nosterna Roleplay (All rights reversed)" })
            .setThumbnail(`https://assets.open.mp/assets/images/skins/${row[0].skin}.png`)
            .setTimestamp();

        mek = interaction.update({ embeds: [msgrow], components: [], ephemeral: true });
    }
};