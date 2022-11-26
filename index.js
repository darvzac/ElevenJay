require('better-logging')(console);
const { default_prefix, config, prefix } = require("./configs/config.json");
const fetch = require("node-fetch");
const { Database } = require("quickmongo");
const db = new Database(process.env.ZarcDB);
const dbo = require('old-wio.db');
const dbx = require('quick.db');
const mongoose = require('mongoose');
const colors = require("colors");
const fs = require('fs');
const ms = require("ms");
const path = require("path");
const axios = require("axios");
const moment = require("moment");
const Nuggies = require('nuggies');
require('@weky/inlinereply');
const discord = require("discord.js");
const client = new Client({
    intents: 32767,
});
const { Collection, Client, Attachment, Discord, Intents } = require("discord.js");
 const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const yts = require('yt-search')
const smartestchatbot = require('smartestchatbot')
const scb = new smartestchatbot.Client()
require('discord-reply');
const { GCommands } = require("gcommands");
const YoutubePoster = require("discord-yt-poster");
const autoresSchema = require('./schemas/autores')

const sendError = require('./mores/error');
const sendDone = require('./mores/success');

client.queue = new Map();
client.vote = new Map();

 client.YTP = new YoutubePoster(client);

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

const { Player } = require('discord-player');
const player = new Player(client, {
	enableLive: true,
	autoSelfDeaf: true,
	leaveOnEnd: true,
	leaveOnEndCooldown: 5000,
	leaveOnEmpty: true,
	leaveOnStop: true
});
client.player = player;
client.emotes = require('./configs/emotes.json');
client.filters = require('./configs/filters.json');

//Handler
client.categories = fs.readdirSync('./commands/');
['command', 'events'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});


fs.readdir('./player-events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./player-events/${file}`), eventName = file.split(".")[0];
		console.log(`Loading player event ${eventName}`);
		client.player.on(eventName, event.bind(null, client));
	});
});

client.on("messageCreate", async message => {
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`e?help to see all command`);
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(default_prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

db.on("ready", () => {
	console.log("MongoDB Connected")
});

mongoose.connect(process.env.ZarcDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(console.log('MongoDB ✅'));
//ctabot

client.on("messageCreate", async (message) => {
        let channel = await db.get(`chatbot_${message.guild.id}`);
     if(!channel) return;
        var sChannel = message.guild.channels.cache.get(channel);
     if (message.author.bot || sChannel.id !== message.channel.id) return;
     message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
    if (message.content.includes(`@`)) {
      return message.channel.send(`**:x: Please dont mention anyone**`);
    }
    message.channel.startTyping();
    if (!message.content) return message.channel.send("Please say something.");
    scb.chat({message: message.content, name: client.user.username, owner:"**ZarcDev**", user: message.author.id, language:"en"}).then(reply => {
    message.lineReply(reply);
    })
    message.channel.stopTyping();
  });

//SNIPE

 client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})

client.on("messageCreate", async message => {
if(!message.guild) return;
  let prefix = db.get(`default_prefix${message.guild.id}`)
  if(prefix === null) prefix =default_prefix;
  
  if(!message.content.startsWith(default_prefix)) return;
 
})


// Set the bot's online/idle/dnd/invisible status
client.on("ready", () => {
    client.user.setStatus("idle");
    console.log("ElevenJay Now Online hahaha")
});

client.on("messageCreate", async message => {
if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
  
  if(!message.content.startsWith(prefix)) return;
 
})


client.on('voiceStateUpdate', (old, New) => {
    if(old.id !== client.user.id) return
    if(old.channelID && !New.channelID) client.queue.delete(old.guild.id)
})

client.on('ready', () => {
var channel = client.channels.cache.get('812592647876247579');
    if (channel) channel.join();
});

client.on('guildMemberAdd', member => {

  let Role = db.get(`autorole_${member.guild.id}`)
  if (!Role) return;

  let role = member.guild.roles.cache.get(Role)
  if (!role) return;

  member.roles.add(role);
});

//-------------------Posting stats----------------\\
const top = require('top.gg-core');

    const topgg = new top.Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4NzkxNjE4NzYxMDY0NDUxMCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI3NjQ0NTA4fQ.RTOFNq6ovULP_7gdFCbXV_UseMmG4q7pD7k4kde1keI');//Top.gg Bot token
   setInterval(() => {
    topgg.post({
      servers: client.guilds.cache.size
    });
  }, 3600000); //will post every 1 hour

client.on('messageCreate',async (message) => {
        if(message.author.bot) return;
        var data = await autoresSchema.find({guildId: message.guild.id})
        if(data) {
            const f = data.find(c => c.msg === message.content) 
            if(f) {
            return message.channel.send(f.res)
            }
        }
		if(message.content.startsWith(prefix + 'add')) {
            if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('You dont have permissions to run this command.')
            message.channel.send('**Hi, Please send msg thats you want \\😁, `Great`**')
            message.channel.awaitMessages((msg) => msg.author.id === message.author.id, {max: 1}).then(c => {
                message.channel.send('**Now please send the response, `SMASH`**')
                message.channel.awaitMessages((msg) => msg.author.id === message.author.id, {max: 1}).then(async(d) => {
                    const id = idgen()
                    message.channel.send(new MessageEmbed()
                    .setTitle('\\🌌 Auto responsess')
                    .setColor('AQUA')
                    .setDescription(`**\`\`\`>  msg: ${c.first().content}\n>  res: ${d.first().content}\n>  Id: ${id} \`\`\`**`));
                    await autoresSchema.create({ guildId: message.guild.id, msg: c.first().content, res: d.first().content, makeId: idgen() });
                })
            })
        }
        if(message.content.startsWith(prefix + 'list')) {
            if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('You dont have permissions to run this command.')

            if(data) {
                console.log(data)
                message.channel.send(new MessageEmbed()
                .setTitle('\\🌌 Auto responsess')
                .setColor('AQUA')
                .setDescription(data.map((d, index) => `**#${index+ 1}\n> \`\`\` Message: ${d.msg}\n>  Response: ${d.res} \n>  Id: ${d.makeId}\`\`\`**`))
                )
            }
        }
        if(message.content.startsWith(prefix + 'edit')) {
            if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('You dont have permissions to run this command.')
            message.channel.send('Please send document ID (Auto response id)')
            message.channel.awaitMessages((msg) => msg.author.id === message.author.id, {max: 1}).then(async(c) => {
                var datas = await autoresSchema.findOne({guildId: message.guild.id, makeId: c.first().content})
                if(!datas) return message.channel.send('I can\'t find anything')
                message.channel.send('Please send new msg')
                message.channel.awaitMessages((msg) => msg.author.id === message.author.id, {max: 1}).then((d) => {
                    message.channel.send('Please send new Response')
                    message.channel.awaitMessages((msg) => msg.author.id === message.author.id, {max: 1}).then(async(e) => {
                        datas.msg = d.first().content
                        datas.res = e.first().content
                        await datas.save()
                        
                        message.channel.send('Done thats save')
                    })
                })
            })
        }
        if(message.content.startsWith(prefix + 'remove')) {
            if(!message.member.permission.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('You dont have permissions to run this command.')
            message.channel.send('Please send document ID (Auto response id)')
            message.channel.awaitMessages((msg) => msg.author.id === message.author.id, {max: 1}).then(async(c) => {
                const datas =  await autoresSchema.findOne({guildId: message.guild.id, makeId: c.first().content})
                if(!datas) return message.channel.send('I cant find the document id')
                datas.deleteOne().then(() => message.channel.send('Done has been deleted'))
            })
        }
	});

client.login(process.env.TOKEN).catch(err => console.error('Error [TOKEN_INVALID]: An invalid token was provided.'))

function idgen() {
    return  `_${Math.random().toString(36).substr(2, 5)}_${Math.random().toString(36).substr(2, 5)}`
}
