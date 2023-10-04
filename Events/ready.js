const Discord = require('discord.js');
const loadSlashCommands = require('../Loaders/loadSlashCommands');


//Alert the bot is working
module.exports = async (bot, message) => {

    await loadSlashCommands(bot);

    console.log(`${bot.user.username} is working!`);
};