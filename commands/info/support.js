const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "support",
  category: "other",
  description: "support this bot",
  run: async (client, message, args) => {
  let embed = new MessageEmbed()
 .setThumbnail(client.user.displayAvatarURL({format: 'png', dynamic: true})+"?size=2048")
 .setTitle("Support")
 .setDescription("Support ElevenJay")
 .addField('TopGG Vote','**[Discord](https://top.gg/bot/787916187610644510/vote)**', true)
 .addField('Donate', '**[Click Here](https://saweria.co/AlvinJumz)**', true)
 .addField('Vote', '**[Click Here](https://voidbots.net/bot/787916187610644510)**')
 .setColor("BLACK")
 .setFooter("© Elevenjay")
 .setTimestamp()
message.channel.send({ embeds: [embed] });
}
};