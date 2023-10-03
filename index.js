const Discord = require('discord.js');
const client = new Discord.Client({
    intents: 3276799
});

require('dotenv').config();


const  token = process.env.FOXBOT_TOKEN;


client.on('ready' , () => {
    console.log(`${client.user.username} is back !`);
});

client.login(token);
