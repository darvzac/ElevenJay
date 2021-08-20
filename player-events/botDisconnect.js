const Discord = require('discord.js');
const config = require('../configs/config.json');

module.exports = (client, message, queue) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('ElevenJay Disconnected!')
	.setDescription(`${client.emotes.error} - Music stopped as i have been disconnected from the channel !`)
	.setFooter('ElevenJay Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send({ embeds: [embed] });

};