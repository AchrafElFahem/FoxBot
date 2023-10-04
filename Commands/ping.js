const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'ping',
    description : 'Ping du bot',
    permission : 'None',
    dm : true,

    async run(bot, message) {
        await message.reply(`Ping : ${bot.ws.ping}`);
    }
};