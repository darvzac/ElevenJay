const Discord = require("discord.js");
const embedcolor = require("../../configs/emotes.json")
module.exports = {

   name: "search",
        aliases: [],
        category: "music",
        description: "Searchs for music",
        usage: "",
      accessableby: "", 
    
    run: async (client, message, args) => {

        const embed1 = new Discord.MessageEmbed()
    .setTitle('Something went wrong!')
    .setDescription(`${client.emotes.error} - You're not in a voice channel !`)
    .setFooter('ElevenJay Music System')
    .setColor(embedcolor)
    .setTimestamp();

    const embed2 = new Discord.MessageEmbed()
    .setTitle('Something went wrong!')
    .setDescription(`${client.emotes.error} - You're not in my voice channel !`)
    .setFooter('ElevenJay Music System')
    .setColor(embedcolor)
    .setTimestamp();

    const embed3 = new Discord.MessageEmbed()
    .setTitle('Something went wrong!')
    .setDescription(`${client.emotes.error} - No music currently playing !`)
    .setFooter('ElevenJay Music System')
    .setColor(embedcolor)
    .setTimestamp();

    if (!message.member.voice.channel) return message.channel.send({ embeds: [embed1] });

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ embeds: [embed2] });

    if (!client.player.getQueue(message)) return message.channel.send({ embeds: [embed3] });

    const success = client.player.shuffle(message);
    const embed4 = new Discord.MessageEmbed()
    .setTitle('Success!')
    .setDescription(`${client.emotes.success} - Queue shuffled **${client.player.getQueue(message).tracks.length}** song(s) !`)
    .setFooter('ElevenJay Music System')
    .setColor(embedcolor)
    .setTimestamp();
    if (success) message.channel.send({ embeds: [embed4] });

    }
};