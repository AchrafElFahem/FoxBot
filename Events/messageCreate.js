const Discord = require('discord.js');

// Activate commande if in message

module.exports = async (bot, message) => {
    let prefix = "?"; // create a prefix variable for commands

    let messageArray = message.content.split(" "); //create a array of words in the message
    let args = messageArray.slice(1); 
    let commandName = messageArray[0].slice(prefix.length); //get the command name from the message
    if(!message.content.startsWith(prefix) || message.author.bot) return; //if the message doesn't start with the prefix or is a bot message, return

    let command = require(`../Commands/${commandName}`); //load the command from the Commands folder
    if(!command) return message.reply("Il n'y a pas de commandes!"); //if the command doesn't exist, return

    command.run(bot, message, args); //run the command
};