const { StringSelectMenuInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'select-benefit',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const value1 = interaction.values[0] == 'AboutBenefit';
        const value2 = interaction.values[0] == 'StreamerBenefit';
        const value3 = interaction.values[0] == 'BoostBenefit';
        const value4 = interaction.values[0] == 'GirlBenefit';
        
        const msgEmbedAccountDiscord = new EmbedBuilder()
            .setTitle('Nosterna | Community ')
            //.setThumbnail(config.icon.thumbnail)
            //.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`What is benefit in Nosterna Roleplay!\n\n What is benefit? Benefit is the profit that is generated if you do something with certain conditions such as doing something or helping etc. that can generate profit.`)
            .setColor("FFFF00")
            .setFooter({ text: "© Copyright Nosterna Community"});
            
        const msgEmbedNitroDiscord = new EmbedBuilder()
            .setTitle('Nosterna | Community ')
            //.setThumbnail(config.icon.thumbnail)
            //.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`Uang IC $10.000\nMAKAN MINUM 10\nVIP Pro Access 30d`)
            .setColor("FFFF00")
            // .setImage('https://assets.open.mp/assets/images/vehiclePictures/Vehicle_468.jpg')
            .setFooter({ text: "© Copyright Nosterna Community"});
         
         const msgEmbedServerBooster = new EmbedBuilder()
            .setTitle('Nosterna | Community ')
            //.setThumbnail(config.icon.thumbnail)
            //.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`Uang IC $6.000\nVIP Basic Access 15d`)
            .setColor("FFFF00")
            // .setImage('https://assets.open.mp/assets/images/vehiclePictures/Vehicle_480.jpg')
            .setFooter({ text: "© Copyright Nosterna Community"});
           
        const msgEmbedBuildBotjs = new EmbedBuilder()
            .setTitle('Nosterna | Community ')
            //.setThumbnail(config.icon.thumbnail)
            .setImage('https://media.discordapp.net/attachments/1373256554148528148/1373365565556785192/comet-1-1.jpg?ex=682b775a&is=682a25da&hm=8bc840e7693467eaf1e33c2bd6509d228e2fbf092b1125039650b0e87578a6a0&=&format=webp')
            .setDescription(`Uang IC $10.000\n Mobil Comet`)
            .setColor("FFFF00")
            .setFooter({ text: "© Copyright Nosterna Community"});
            
        if(value1) {
        await interaction.reply({ embeds : [msgEmbedAccountDiscord], ephemeral: true });
        }
        else if(value2) {
        await interaction.reply({ embeds : [msgEmbedNitroDiscord], ephemeral: true });
        }
        else if(value3) {
        await interaction.reply({ embeds : [msgEmbedServerBooster], ephemeral: true });
        }
        else if(value4) {
        await interaction.reply({ embeds : [msgEmbedBuildBotjs], ephemeral: true });
        }

    }
};
