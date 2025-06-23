const query = require("samp-query");
const { EmbedBuilder, ChannelType } = require('discord.js');
let messageEmbed; // Variabel untuk menyimpan pesan embed
let serverOnlineTime = null;

function updateEmbed(client, channelId) {
    let server_ip = '103.42.116.245';
    let server_port = '7001';
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
            .setImage('https://media.discordapp.net/attachments/1372979966026977280/1373172739439071302/Sab_17_05_2025_10_25_56.png?ex=682a1b05&is=6828c985&hm=dbfab1035bfb5b962292e2a8d424d0737f92b96a41dccb4ca7b42d05f4eafb12&=&format=webp&quality=lossless&width=656&height=656')
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