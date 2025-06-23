const { ChannelType, Message } = require("discord.js");
const config = require("../../../config");
const { log } = require("../../../functions");
const ExtendedClient = require("../../class/ExtendedClient");

const cooldown = new Map();

module.exports = {
    event: "messageCreate",
    /**
     *
     * @param {ExtendedClient} client
     * @param {Message<true>} message
     * @returns
     */
    run: async (client, message) => {
        if (message.author.bot || message.channel.type === ChannelType.DM) return;

        if (!config.handler.commands.prefix) return;

        let prefix = config.handler.prefix;

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandInput = args.shift().toLowerCase();

        if (!commandInput.length) return;

        let command =
            client.collection.prefixcommands.get(commandInput) ||
            client.collection.prefixcommands.get(
                client.collection.aliases.get(commandInput)
            );

        if (command) {
            try {
                // Check for owner or developer permissions
                if (command.options?.ownerOnly || command.options?.developers) {
                    const isOwner = interaction.user.id === config.users.ownerId;
                    const isDeveloper = config.users?.developers?.includes(interaction.user.id);

                    if (!isOwner && !isDeveloper) {
                        const errorMessage = command.options.ownerOnly
                            ? (config.messageSettings.ownerMessage || "The bot developer has the only permissions to use this command.")
                            : (config.messageSettings.developerMessage || "You are not authorized to use this command");

                        await interaction.reply({
                            content: errorMessage,
                            ephemeral: true
                        });
                        return;
                    }

                    if (command.options?.developers && config.users?.developers?.length <= 0) {
                        await interaction.reply({
                            content: config.messageSettings.missingDevIDsMessage || "This is a developer only command, but unable to execute due to missing user IDs in configuration file.",
                            ephemeral: true
                        });
                        return;
                    }
                }

                if (command.structure?.nsfw && !message.channel.nsfw) {
                    await message.reply({
                        content:
                            config.messageSettings.nsfwMessage !== undefined &&
                                config.messageSettings.nsfwMessage !== null &&
                                config.messageSettings.nsfwMessage !== ""
                                ? config.messageSettings.nsfwMessage
                                : "The current channel is not a NSFW channel.",
                        ephemeral: true
                    });

                    return;
                }

                if (command.structure?.cooldown) {
                    const cooldownFunction = () => {
                        let data = cooldown.get(message.author.id);

                        data.push(commandInput);

                        cooldown.set(message.author.id, data);

                        setTimeout(() => {
                            let data = cooldown.get(message.author.id);

                            data = data.filter((v) => v !== commandInput);

                            if (data.length <= 0) {
                                cooldown.delete(message.author.id);
                            } else {
                                cooldown.set(message.author.id, data);
                            }
                        }, command.structure?.cooldown);
                    };

                    if (cooldown.has(message.author.id)) {
                        let data = cooldown.get(message.author.id);

                        if (data.some((v) => v === commandInput)) {
                            await message.reply({
                                content:
                                    (config.messageSettings.cooldownMessage !== undefined &&
                                        config.messageSettings.cooldownMessage !== null &&
                                        config.messageSettings.cooldownMessage !== ""
                                        ? config.messageSettings.cooldownMessage
                                        : "Slow down buddy! You're too fast to use this command ({cooldown}s).").replace(/{cooldown}/g, command.structure.cooldown / 1000),
                                ephemeral: true
                            });

                            return;
                        } else {
                            cooldownFunction();
                        }
                    } else {
                        cooldown.set(message.author.id, [commandInput]);

                        cooldownFunction();
                    }
                }

                command.run(client, message, args);
            } catch (error) {
                log(error, "err");
            }
        }
    },
};
