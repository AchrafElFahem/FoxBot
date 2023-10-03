//import modules
const Discord = require('discord.js');

require('dotenv').config();



//define objects
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents : intents});
const loadCommands = require('./Loaders/loadCommands.js');
const loadEvents = require('./Loaders/loadEvents.js');

bot.commands = new Discord.Collection();

//login bot
bot.login(process.env.FOXBOT_TOKEN);

//load commands and events
loadCommands(bot);
loadEvents(bot);


