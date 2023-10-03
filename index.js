//import modules
const Discord = require('discord.js');

require('dotenv').config();



//define bot
const bot = new Discord.Client({intents : 3276799});

//login bot
bot.login(process.env.FOXBOT_TOKEN);


// alert than bot works
bot.on('ready', () => {console.log(`${bot.user.username} is working!`);});