const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "get information About Ping",
  run: async (client, message, args) => {
    var PinG = `${Date.now() - message.createdTimestamp}`

 var api = message.client.ws.ping;

 if (message.author.bot) return;
 let ping = new MessageEmbed()

 .setColor("RED")
 .setTitle(`Pinging..`);

 message.channel.send(ping).then(function(p) {
 setTimeout(function() {
 p.edit({
  embed: new MessageEmbed()
 .setColor("BLACK")
 .setTitle(" :ping_pong: Pong")
 .setDescription("❯ Time Taken: `"+PinG+" ms.`\n❯ API Ping: `"+api+" ms.`")
   
 });
 }, 500);
 })
  }
}
