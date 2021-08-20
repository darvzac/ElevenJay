const { MessageEmbed } = require("discord.js")
const { platform, arch, cpus } = require("os")

module.exports = {
  name: "botinfo",
  aliases: ["stats"],
  category: "info",
  description: "stats about bot",
  run: async (client, message, args) => {

  const model = cpus()[0].model + " " + arch()
  const tanggalBuat = client.user.createdAt
  
  const embed = new MessageEmbed()
  .setTitle('*ElevenJay Information*')
  .setColor('BLACK')
  .setThumbnail(client.user.displayAvatarURL({format: 'png', dynamic: true})+"?size=2048")
  .addField('Name', `${client.user.tag}`, true)


  .addField("Created On", `${tanggalBuat}`, true)


  .addField('Discord.js Version:', 'v12.5.1', true)

  .addField('Prefix', '`e?`', true)

  .addField('Embed Color', '`BLACK`, `RANDOM`')


  .addField('Guilds:', `${client.guilds.cache.size}`, true)


  .addField('Users:', `${client.users.cache.size}`, true)


    .addField("System", `
CPU: ${model}
Platform: ${platform}
Websocket: ${client.ws.ping} ms(miliseconds)`)


.addField("Join The Support Server", '**[Click Here](https://discord.gg/rqRyXfYQf2)**', true)


.addField("Invite The Bot To Your Server", '**[Click Here](https://dsc.gg/elevenjay)**', true)

.addField("DarkStudio", 'https://discord.gg/devs')
  .setFooter('© ElevenJay')
  .setTimestamp()

  message.channel.send({ embeds: [embed] });
  }
};