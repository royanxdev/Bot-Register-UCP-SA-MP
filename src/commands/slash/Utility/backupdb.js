const { SlashCommandBuilder, AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const mysqldump = require('mysqldump');
const path = require('path');
const fs = require('fs');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config'); // Ambil konfigurasi koneksi MySQL dari config.js

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('backupdb')
        .setDescription('Backup database MySQL dan kirim file ke Discord'),

    options: {
        ownerOnly: true,
        developers: true
    },

    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const fileName = `backup-${new Date().toISOString().replace(/[:.]/g, '-')}.sql`;
        const backupDir = path.join(__dirname, '../../../backup');
        const outputPath = path.join(backupDir, fileName);

        try {
            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir, { recursive: true });
            }

            // 🔄 Backup database menggunakan config.mysql
            await mysqldump({
                connection: config.mysql,
                dumpToFile: outputPath,
            });

            // Pastikan file backup benar-benar terbentuk
            if (!fs.existsSync(outputPath)) {
                throw new Error('File backup gagal dibuat.');
            }

            const fileStats = fs.statSync(outputPath);
            const fileSizeMB = fileStats.size / (1024 * 1024);
            const attachment = new AttachmentBuilder(fs.createReadStream(outputPath), { name: fileName });

            const successEmbed = new EmbedBuilder()
                .setTitle('✅ Backup Berhasil')
                .setDescription('File backup database berhasil dibuat dan dikirim.')
                .addFields(
                    { name: 'Nama File', value: fileName },
                    { name: 'Ukuran File', value: `${fileSizeMB.toFixed(2)} MB` },
                    { name: 'Tanggal', value: new Date().toLocaleString('id-ID') }
                )
                .setColor('#26A65B')
                .setTimestamp()
                .setFooter({ text: 'Database Backup System' });

            await interaction.editReply({ 
                embeds: [successEmbed], 
                files: [attachment] 
            });

            // Opsional: Hapus file setelah upload
            // fs.unlinkSync(outputPath);

        } catch (err) {
            console.error('[BACKUP ERROR]', err);

            if (fs.existsSync(outputPath)) {
                fs.unlinkSync(outputPath);
            }

            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Backup Gagal')
                .setDescription('Terjadi kesalahan saat melakukan backup database.')
                .addFields({ 
                    name: 'Error', 
                    value: `\`\`\`${err.message}\`\`\`` 
                })
                .setColor('#E74C3C')
                .setTimestamp()
                .setFooter({ text: 'Database Backup System' });

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    }
};
