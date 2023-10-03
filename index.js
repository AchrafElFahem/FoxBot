//import modules
const Discord = require('discord.js');

require('dotenv').config();



//define objects
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents : intents});
const loadCommands = require('./Loaders/loadCommands.js');

bot.commands = new Discord.Collection();

//login bot
bot.login(process.env.FOXBOT_TOKEN);

//load commands
loadCommands(bot);

//show commands when message created
bot.on('messageCreate', async (message) => {
    if(message.content === '!ping') return bot.commands.get('ping').run(bot, message);
});


// alert than bot works
bot.on('ready', () => {console.log(`${bot.user.username} is working!`);});