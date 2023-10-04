const Discord = require('discord.js');

module.exports = {
    name : "ban",
    description : "ban un membre du serveur",
    permission : Discord.PermissionFlagsBits.BanMembers,
    dm : false,
    options : [
        {
            type : "user",
            name : "membre",
            description : "le membre à bannir",
            required : true
        },
        {
            type : "string",
            name : "raison",
            description : "la raison du bannissement",
            required : true //Give always a reason 
        }
    ],

    async run(bot, message, args) {
        try {
            let user = args.getUser("membre");
            if(!user) return message.reply("Veuillez fournir un utilisateur valide");
            let member = await message.guild.members.cache.get(user.id);

            let reason = args.getString("raison");

            //Errors gestions
            if(message.user.id === user.id) return message.reply("Vous ne pouvez pas vous bannir vous-même");
            if(await message.guild.fetchOwner().id === user.id) return message.reply("Vous ne pouvez pas bannir le propriétaire du serveur");
            if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre");
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas bannir ce membre");
            if((await message.guild.bans.fetch()).get(user.id))return message.reply("Ce membre a déjà été banni");

            //send message to banned user
            try {
                await user.send(`Vous avez été banni par ${message.user.username} du serveur ${message.guild.name} pour la raison : ${reason}`);
            } catch (error) {
                console.log(error);
            }

            await message.reply(`${message.user} a banni ${user.username} du serveur ${message.guild.name} pour la raison : ${reason}`);

            await member.ban({reason: reason});

        } catch (error) {
            console.log(error);
            return message.reply("Veuillez fournir un membre valide");
        }
    },

};
