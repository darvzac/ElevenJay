const Discord = require('discord.js')

//Brrr


exports. run = async (client, message, args) => {
  
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You don't have premssions to do that!");

        message.channel.clone().then(channel => {
          
            channel.setPosition(message.channel.position)
          
            channel.send('☢️ This Channel has been nuked\nhttps://imgur.com/LIyGeCR')
          
        })
  
        message.channel.delete()
        
}