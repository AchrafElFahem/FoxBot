const Discord = require('discord.js');


module.exports = async (bot) => {

    let commands = [];

    bot.commands.forEach(async command => {

        let slashcommand = new Discord.SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
        .setDMPermission(command.dm)
        .setDefaultMemberPermissions(command.permission === 'None'? null : command.permission);

        command.options?.forEach(option => {
            slashcommand[`add${option.type.slice(1).toUpperCase() + option.type.slice(1,option.type.length)}Option`]
            (opt => opt.setName(option.name).setDescription(option.description).setRequired(option.required));
        });
        commands.push(slashcommand);
    });
    const rest = new Discord.REST({ version: '10' }).setToken(bot.token);
    await rest.put(Discord.Routes.applicationCommands(bot.user.id), { body: commands });
    
    console.log(`Slash Commands loaded successfully`);
};