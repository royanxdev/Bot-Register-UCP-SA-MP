const { EmbedBuilder } = require('discord.js');
const MysqlGrand = require('../../../Mysql');
const bcrypt = require('bcrypt');

module.exports = {
    customId: 'modal-register',
    /**
     * 
     * @param {Client} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {
        const ucp = interaction.fields.getTextInputValue('ucp_input');
        const password = interaction.fields.getTextInputValue('password_input');
        const confirmPassword = interaction.fields.getTextInputValue('confirm_password_input');

        if (/_/.test(ucp)) {
            return interaction.reply({ content: ':x: UCP name tidak boleh menggunakan symbol (_)!', ephemeral: true });
        }
        if (/\d/.test(ucp)) {
            return interaction.reply({ content: ':x: UCP kamu tidak boleh menggunakan angka', ephemeral: true });
        }
        if (password !== confirmPassword) {
            await interaction.reply({ content: ':x: Terjadi kesalahan saat membuat password', ephemeral: true });
            return;
        }

        const [UdahAdaAkun] = await MysqlGrand.query(`SELECT * FROM playerucp WHERE ucp = '${ucp}'`);
        if (UdahAdaAkun.length < 0) {
            return interaction.reply({ content: ':x: UCP name sudah silahkan gunakan nama ucp lainnya', ephemeral: true });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const registeredAt = new Date().toISOString();
        await MysqlGrand.query('INSERT INTO playerucp (ucp, password, DiscordID) VALUES (?, ?, ?)', [ucp, hashedPassword, interaction.user.id]);

        const embed = new EmbedBuilder()
            .setTitle('<:c58d0b23f14b4e9d860d8730afef3a1e:1315565240263376958> Nosterna User Panel Control')
            .setDescription('Account ucp anda berhasil ke registrasi silahkan ke channel <#1373237490231804006> untuk mendpatkan update ip server untuk login ke server')
            .addFields(
                { name: '> User Panel Control', value: `\`\`\`\n${ucp}\n\`\`\``, inline: false },
                { name: '> Password', value: `\`\`\`\n${password}\n\`\`\``, inline: false },
                // { name: '> Date Create', value: `\`\`\`\n${registeredAt}\n\`\`\``, inline: false },
            )
            .setImage('https://media.discordapp.net/attachments/1204061404940865567/1316322495619530822/Beige_Modern_Boarding_Pass_Ticket_2.png?ex=675aa05b&is=67594edb&hm=8cc97cd719ce5a32abb1790f035925285be5c0abd5c5c3c502214cf03d04110e&=&format=webp&quality=lossless&width=550&height=178')
            .setColor("FFFF00")
            .setFooter({ text: 'Copyright (c) 2024 Nosterna Roleplay (All rights reversed)' })
            .setTimestamp();

        interaction.member.setNickname(`${ucp}`);
        await interaction.reply({ content: 'Cek pm anda kami sudah mengirimkan account UCP yang sudah anda buat', ephemeral: true });

        // Tambahan: Memberikan role setelah berhasil registrasi
        await interaction.member.roles.add('1384944641937248326').catch((err) => {
            console.error('Gagal memberi role:', err);
        });
    }
};
