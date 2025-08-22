const query = require("samp-query");
const { EmbedBuilder, ChannelType } = require('discord.js');
let messageEmbed; // Variabel untuk menyimpan pesan embed
let serverOnlineTime = null;

function updateEmbed(client, channelId) {
    let server_ip = '104.234.180.165';
    let server_port = '7003';
    const samp = { host: server_ip, port: server_port };

    query(samp, (error, response) => {
        let uptimeString = "N/A";
        if (!error) {
            // Initialize serverOnlineTime if server is online and time hasn't been set
            if (!serverOnlineTime) {
                serverOnlineTime = new Date();
            }
            // Calculate uptime
            const now = new Date();
            const uptimeMs = now - serverOnlineTime;
            const uptimeHours = Math.floor(uptimeMs / 3600000);
            const uptimeMinutes = Math.floor((uptimeMs % 3600000) / 60000);
            uptimeString = `${uptimeHours} Hours, ${uptimeMinutes} Minutes`;
        } else {
            // Reset serverOnlineTime if server is offline
            serverOnlineTime = null;
        }

        const embed = new EmbedBuilder()
            .setTitle('Nosterna Roleplay')
            .setColor("FFFF00")
            .setImage('https://media.discordapp.net/attachments/1390919203434921995/1390920518089052264/file_00000000eccc61fd9508dc8e9fc84aba.png?ex=686a032d&is=6868b1ad&hm=f391be072fed51ac431ba5a2d271117b3211d44c18bf27bbe5b8a0dd3a779e65&=&format=webp&quality=lossless&width=552&height=552')
            .addFields(
                { name: '> STATUS', value: error ? '```🔴 Offline```' : '```🟢 Online```', inline: true },
                { name: '> PLAYERS', value: error ? '```N/A```' : `\`\`\`\n${response['online']}/${response['maxplayers']}\n\`\`\``, inline: true },
                { name: '> CONNECT', value: `\`\`\`\n${server_ip}:${server_port}\n\`\`\``, inline: false },
                { name: '> NEXT RESTART', value: '```23.00 WIB```', inline: true },
                { name: '> UPTIME', value: `\`\`\`\n${uptimeString}\n\`\`\``, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Updated every minute' });

        const channel = client.channels.cache.get(channelId);

        if (!messageEmbed && channel.type === ChannelType.GuildText) {
            // Kirim embed baru jika belum ada pesan embed yang disimpan
            channel.send({ embeds: [embed]}).then(sentMessage => {
                messageEmbed = sentMessage; // Simpan pesan embed yang dikirim
            }).catch(console.error);
        } else if (messageEmbed) {
            // Edit pesan embed yang sudah ada
            messageEmbed.edit({ embeds: [embed] }).catch(console.error);
        }
    });
}

module.exports = { updateEmbed };