//import fs from 'fs';
const fs = require('fs');


//export and load events from the Events folder
module.exports = async bot => {
    //scan the Events folder for events
    const files = fs.readdirSync('./Events').filter(file => file.endsWith('.js')).forEach(async file => {
        let event = require(`../Events/${file}`);
        bot.on(file.split(".js").join(""), event.bind(null,bot));
        console.log(`${file} loaded successfully`);
    });

};