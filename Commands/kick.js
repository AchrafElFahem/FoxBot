const Discord = require('discord.js');

module.exports = {
    name : "kick",
    description : "kick un membre du serveur",
    permission : Discord.PermissionFlagsBits.BanMembers,
    dm : false,
    options : [
        {
            type : "user",
            name : "membre",
            description : "le membre à kick",
            required : true
        },
        {
            type : "string",
            name : "raison",
            description : "la raison du kick",
            required : true //Give always a reason 
        }
    ],

    async run(bot, message, args) {
        let user = args.getUser("membre");
        if(!user) return message.reply("Veuillez fournir un utilisateur valide");
        let member = await message.guild.members.cache.get(user.id);
        if(!member) return message.reply("Veuillez fournir un membre valide");

        let reason = args.getString("raison");

        //Errors gestions
        if(message.user.id === user.id) return message.reply("Vous ne pouvez pas vous kick vous-même");
        if(await message.guild.fetchOwner().id === user.id) return message.reply("Vous ne pouvez pas kick le propriétaire du serveur");
        if(member && !member.bannable) return message.reply("Je ne peux pas kick ce membre");
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas kick ce membre");

        //send message to kicked user
        try {
            await user.send(`Vous avez été kick par ${message.user.username} du serveur ${message.guild.name} pour la raison : ${reason}`);
        } catch (error) {
            console.log(error);
        }

        await message.reply(`${message.user} a kick ${user.username} du serveur ${message.guild.name} pour la raison : ${reason}`);

        await member.kick({reason: reason});
    },

};
