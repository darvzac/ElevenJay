const chalk = require('chalk');
const Discord = require('discord.js');
const config = require('../../configs/config.json');

module.exports = async (client, guild) => {
	const { MessageEmbed } = require("discord.js");

  const ID = "835357805711589416";
  const channel = client.channels.cache.get(ID);

  const sowner = await guild.members.fetch(guild.ownerID)

  if (!channel) return;

  const embed = new MessageEmbed()

    .setTitle("Someone just kick me in their server!")

    .addField(`Server Name`, `${guild.name}`)

    .addField(`Server ID`, `\`${guild.id}\``)

    .addField(`Server Owner`, `\`${sowner.user.tag}\``)

    .addField(`Owner ID`, `\`${sowner.id}\``)
 
    .addField(`Create On`, `\`${guild.createdAt}\``)
  
    .addField(`Members`, `\`${guild.memberCount}\``)
  
    .setTimestamp()

    .setColor("RED")

    .setFooter(`Servers Count - ${client.guilds.cache.size}`);

  channel.send({ embeds: [embed] });

};