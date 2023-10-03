//import fs from 'fs';
const fs = require('fs');


//export and load commands from the Commands folder
module.exports = async bot => {
    //scan the Commands folder for commands
    const files = fs.readdirSync('./Commands').filter(file => file.endsWith('.js')).forEach(async file => {
        let command = require(`../Commands/${file}`);
        if(!command.name || typeof command.name != 'string') throw new TypeError('Command must have a name and a have to be a string type');
        bot.commands.set(command.name, command);
        console.log(`${file} loaded successfully`);
    });

};