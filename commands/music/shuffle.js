const Discord = require("discord.js");
const { embedcolor, prefix } = require('../../configs/config.json');

module.exports = {
   name: "shuffle",
        aliases: [],
        category: "music",
        description: "To mix the queue",
        usage: "",
        accessableby: "", 
   
    run: async (client, message, args) => {
	const embednoinvoice = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - You're not in a voice channel !`)
    .setFooter('ElevenJay Music System')
    .setColor(embedcolor)
	.setTimestamp();
	const embednosong = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - No songs currently playing !`)
    .setFooter('ElevenJay Music System')
    .setColor(embedcolor)
	.setTimestamp();
	const embedshuffle = new Discord.MessageEmbed()
	.setTitle('Shuffled!')
	.setDescription(`${client.emotes.success} - Queue shuffled **${client.player.getQueue(message).tracks.length}** song(s) !`)
    .setFooter('ElevenJay Music System')
    .setColor(embedcolor)
	.setTimestamp();
    if (!message.member.voice.channel) return message.channel.send({ embeds: [embednoinvoice] });

    if (!client.player.getQueue(message)) return message.channel.send({ embeds: [embednosong] });

    client.player.shuffle(message);

    return message.channel.send({ embeds: [embedshuffle] });
    }
};