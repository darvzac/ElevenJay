const Discord = require('discord.js');
const bot = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');
module.exports = async(bot,guild)=>{

const channel = guild.channels.cache.find(c => c.type === "text" && c.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE"));
let inv;
if(channel) { const invite = await channel.createInvite({temporary: false, maxAge: '0', maxUses: '0', unique: false, reason: 'FOR SECURITY REASONS!'}).catch(error => console.log(error))
if(invite) { inv = invite.code;
}
}

    let embed = new Discord.MessageEmbed()
    .setColor(`0x#00ffff`)
    .setURL(inv ? `https://discord.gg/${inv}` : null)
    .setThumbnail(guild.iconURL({dynamic: true}))
    .setFooter(`I Am In ${bot.guilds.cache.size} Servers Now !`)
    .setTitle(`<a:smexy_join:804215770002489405>  Joined A Server !`)
    .setDescription(`**Server Name**: ${guild.name}\n**Server ID**: ${guild.id}\n**Members**: ${guild.memberCount}\n**Owner**: ${guild.owner}\n**Owner ID**: ${guild.ownerID}`)
    .setTimestamp();
    bot.channels.cache.get('835357805711589415').send({ embeds: [embed] });

// XD 
const channelxd = guild.channels.cache.find(c => (c.type === 'text') && (c.permissionsFor(guild.me).has("SEND_MESSAGES")))     
      const embed2 = new Discord.MessageEmbed()
            .setColor('#ffff00')
        
            .setTitle('Hey, Thanks For Inviting Me!')
            .setThumbnail("https://images-ext-2.discordapp.net/external/CUqYX47SDixkRAesbcCCMhaKKQsYx8y6vStdft-t7Y0/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/787916187610644510/27051dcbc017afd326718d58cc1787f5.webp")
            .setFooter(`Made with 💗 by ZarcDev`)
       .setDescription(`ElevenJay is a multi-purpose discord bot ready to skill up and boost up your Discord server! It has about more than Idk How Many The Command Just Enjoy Thank You :)`)
.addField("・Features",`
Giveaways | Moderation | Information | Music | Fun And Games | Tickets | Suggestions | Support
`)
.addField("・More Information",`
The default prefix is e?. Type e?help for a list of commands. The prefix Cannot Be Change Im Sorry Because Some Error. A fully customizable Discord bot for your Discord server that is easy to use and handle.It's updated frequently with new features and enhancements. If there are any features that you would like to see, request them in our Discord server! New features are built off what users ask for.
`) 
.addField("・Important Links",`
[Invite](https://discord.com/oauth2/authorize?client_id=799540871552434186&permissions=2147483647&scope=bot) - Add the bot to anther server!
[Support Server](https://discord.gg/rqRyXfYQf2) - Get some bot support if you are having issues!
`)
        if(channelxd) {
     channelxd.send(embed2).catch(e => console.log(e))
    } else if(guild.systemChannel) {
      guild.systemChannel.send(embed2).catch(err => console.log(err))
 } else {
    bot.channels.cache.get('835357805711589415').send(`Failed to send welcome message in **${guild.name}** | ${guild.id}. `)
 }
    }