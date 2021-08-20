const Discord = require('discord.js');
const config = require('../../configs/config.json');
const { Database } = require("quickmongo")
const db = new Database(process.env.ZarcDB)

module.exports = {
   name: 'autores',
        description: 'Shows autores\'s config',
        aliases: ["autoresponce"],
        usage: '',
        accessableby: "",
    
    run: async (client, message, args) => {
      const embedd = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `🤖 Autores Configuration 
        **${client.emotes.info} Usage :**
         Type \`${config.prefix}add\` - To add message
         Type \`${config.prefix}remove\` - To Remove Massage.
         Autores Set - None
        **${client.emotes.info} Examples :**
         \`${config.prefix}add\` <add autoresponce>
         \`${config.prefix}remove\` <remove autoresponce>
         \`${config.prefix}list\` <show list of autores>
         \`${config.prefix}edit\` <edit autoresponce>`
      )
     .addField(
        "Tutorial Link: ",
        `**[Click Here!](https://media.discordapp.net/attachments/835357805711589407/872323966570758184/IMG_20210804_114353.jpg)**`,
        true
      )
      .addField(
        "Vote Link:",
        `**[Click Here!](https://voidbots.net/bot/787916187610644510/vote)**`,
        true
      )
      .setTimestamp()
      .setFooter(
        "© ElevenJay",
        "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
      )
      .setColor(config.embedcolor);
    
     let channel1 = await db.fetch(`chatbot_${message.guild.id}`);
    if(!channel1) return message.channel.send({ embeds: [embedd] });
    var sChannel = message.guild.channels.cache.get(channel1);
    let embedvch = "<#" + sChannel.id + ">"
    
    const embed = new Discord.MessageEmbed()
    
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `🤖 Autores Configuration 
        **${client.emotes.info} Usage :**
         Type \`${config.prefix}add\` - To add message
         Type \`${config.prefix}remove\` - To Remove Massage.
         Autores Set - None
        **${client.emotes.info} Examples :**
         \`${config.prefix}add\` <add autoresponce>
         \`${config.prefix}remove\` <remove autoresponce>
         \`${config.prefix}list\` <show list of autores>
         \`${config.prefix}edit\` <edit autoresponce>`
      )
     .addField(
        "Tutorial Link: ",
        `**[Click Here!](https://media.discordapp.net/attachments/835357805711589407/872323966570758184/IMG_20210804_114353.jpg)**`,
        true
      )
      .addField(
        "Vote Link:",
        `**[Click Here!](https://voidbots.net/bot/787916187610644510/vote)**`,
        true
      )
      .setTimestamp()
      .setFooter(
        "© ElevenJay",
        "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
      )
      .setColor(config.embedcolor);
    message.channel.send({ embeds: [embed] });
  }
}