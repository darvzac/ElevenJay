const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "links",
  category: "info",
  description: "All the links ElevenJay!",
  run: async (client, message, args) => {
    const sayEmbed = new MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dyanmic: true })
      )
      .addFields(
        {
          name: "VoidBots",
          value: `[here](https://voidbots.net/bot/787916187610644510)`,
          inline: true,
        },
        {
          name: "InfinityBotList",
          value: `[here](https://infinitybotlist.com/bots/787916187610644510/vote)`,
          inline: true,
        },
        {
          name: "TopGG",
          value: `[here](https://top.gg/bot/787916187610644510)`,
          inline: true,
        },
        {
          name: "ElevenJay Support",
          value: `[here](https://discord.gg/grSrKJBdDq)`,
          inline: true,
        }
      )
      .setTimestamp()
      .setColor("RANDOM");

    message.channel.send({ embeds: [sayEmbed] });
  },
};