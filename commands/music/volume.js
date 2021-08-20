const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json');

module.exports = {
   name: "volume",
        aliases: [],
        category: "music",
        description: "To set music volume",
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

        const embed4 = new Discord.MessageEmbed()
        .setTitle('Something went wrong!')
        .setDescription(`${client.emotes.error} - Please enter the volume amount to set!`)
        .setFooter('ElevenJay Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed5 = new Discord.MessageEmbed()
        .setTitle('Something went wrong!')
        .setDescription(`${client.emotes.error} - Volume amount must be in range of \`0-100\`!`)
        .setFooter('ElevenJay Music System')
        .setColor(embedcolor)
        .setTimestamp();

        if (!message.member.voice.channel) return message.reply({ embeds: [embed1] });
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply({ embeds: [embed2] });

        const queue = client.player.getQueue(message);
        if (!queue) return message.reply({ embeds: [embed3] });

        const amount = args[0];
        if (!amount || isNaN(amount)) return message.reply({ embeds: [embed4] });
        if (parseInt(amount) < 0 || parseInt(amount) > 100) return message.reply({ embeds: [embed5] });

        queue.player.setVolume(message, parseInt(amount));
        const embed6 = new Discord.MessageEmbed()
        .setTitle('Success!')
        .setDescription(`${client.emotes.success} - Volume changed to **${queue.volume}%**!`)
        .setFooter('ElevenJay Music System')
        .setColor(embedcolor)
        .setTimestamp();
        message.reply({ embeds: [embed6] });
    }
};