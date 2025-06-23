const { EmbedBuilder } = require('discord.js');
const chalk = require("chalk");
const axios = require('axios');
const config = require('./config');

/**
 * Logs a message with optional styling.
 *
 * @param {string} string - The message to log.
 * @param {'info' | 'err' | 'warn' | 'done' | undefined} style - The style of the log.
 */
const log = (string, style) => {
  const styles = {
    info: { prefix: chalk.blue("[INFO]"), logFunction: console.log },
    err: { prefix: chalk.red("[ERROR]"), logFunction: console.error },
    warn: { prefix: chalk.yellow("[WARNING]"), logFunction: console.warn },
    done: { prefix: chalk.green("[SUCCESS]"), logFunction: console.log },
  };
  
  const selectedStyle = styles[style] || { logFunction: console.log };
  selectedStyle.logFunction(`${selectedStyle.prefix || ""} ${string}`);
};

/**
 * Formats a timestamp.
 *
 * @param {number} time - The timestamp in milliseconds.
 * @param {import('discord.js').TimestampStylesString} style - The timestamp style.
 * @returns {string} - The formatted timestamp.
 */
const time = (time, style) => {
  return `<t:${Math.floor(time / 1000)}${style ? `:${style}` : ""}>`;
};

/**
 * Whenever a string is a valid snowflake (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const isSnowflake = (id) => {
  return /^\d+$/.test(id);
};

/**
 * Whenever a string is a valid IntSucces (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
 const IntSucces = async(interaction, args) => {
    const msgEmbed = new EmbedBuilder()
    .setDescription(args)
    .setColor('FFFF00')
    .setImage('https://media.discordapp.net/attachments/1373037656803381318/1373236943273594943/8ddd0c9ad4fe4e20177aa9a50c6443f0.jpg?ex=6829ae10&is=68285c90&hm=84719164c1b192bd7b8c96dd3db078c820f3464f2161417bbc9b8098acecaa38&=&format=webp&width=691&height=968')
    return interaction.reply({ embeds: [msgEmbed], ephemeral: true })
}

/**
 * Whenever a string is a valid IntError (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const MsgReply = async(interaction, args) => {
    const msgEmbed = new EmbedBuilder()
    .setDescription(args)
    .setImage('https://media.discordapp.net/attachments/1373037656803381318/1373236943273594943/8ddd0c9ad4fe4e20177aa9a50c6443f0.jpg?ex=6829ae10&is=68285c90&hm=84719164c1b192bd7b8c96dd3db078c820f3464f2161417bbc9b8098acecaa38&=&format=webp&width=691&height=968')
    return interaction.reply({ embeds: [msgEmbed], ephemeral: true })
}

/**
 * Whenever a string is a valid IntError (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const IntError = async(interaction, args) => {
    const msgEmbed = new EmbedBuilder()
    .setDescription(args)
    .setColor('FFFF00')
    .setImage('https://media.discordapp.net/attachments/1373037656803381318/1373236943273594943/8ddd0c9ad4fe4e20177aa9a50c6443f0.jpg?ex=6829ae10&is=68285c90&hm=84719164c1b192bd7b8c96dd3db078c820f3464f2161417bbc9b8098acecaa38&=&format=webp&width=691&height=968')
    return interaction.reply({ embeds: [msgEmbed], ephemeral: true })
}

/**
 * Whenever a string is a valid IntUsage (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const IntUsage = async(interaction, args) => {
    const msgEmbed = new EmbedBuilder() 
    .setDescription(args)
    .setColor('Yellow')
    return interaction.reply({ embeds: [msgEmbed], ephemeral: true })
}

module.exports = {
  log,
  time,
  isSnowflake,
  IntSucces,
  IntError,
  IntUsage,
  MsgReply
  
};
