const {
    MessageEmbed,
    Message,
    Client
} = require("discord.js");
const sendError = require('../../mores/error');
const db = require('quick.db');
const {
    readdirSync
} = require("fs");
let color = "#ad0505";

module.exports = {
    name: "help",
    aliases: ['h'],
    description: "Shows all available bot commands.",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        if (!args[0]) {
            let categories = [];


            //categories to ignore
            let ignored = [
              'special'
            ];

            const emo = {
                animal: '🦊',
                fun: "<a:red_happy:782953046639771659>",
                anime: "<a:black_jump:869726615582703706>",
                info: "<a:warning:869728177700864041>",
                image: '<:blurple_image:869778731600859177>',
                moderation: "<:shield:869727314047549461>",
                chatbot: "🤖",
                music: "<a:music:869728021240770621>",
                other: "<:Other:869792358655479839>",
                games: '🎮',
                backup: '💾'
            }

            readdirSync("./commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`
                let cats = new Object();

                cats = {
                    name: name,
                    value: `\`e?help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats);
                //cots.push(dir.toLowerCase());
            });

            const embed = new MessageEmbed()
                .setTitle("Help Menu")
                .setDescription(
                    `\`\`\`js\nTo get help with each category, you can enter e?help [category]\nParameters: <> = required, [] = optional\`\`\`\n<a:Dev:819251175169327205> [Twitter](https://twitter.com/moodalvin?s=09) • [Vote](https://top.gg/bot/787916187610644510/vote) • [Invite me](https://discord.com/oauth2/authorize?client_id=787916187610644510&scope=bot&permissions=8589934591)\n\n__**Categories**__`
                )
                .addFields(categories)
                .setFooter(
                    `Requested by ${message.author.username}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setColor(color);


            return message.channel.send({ embeds: [embed] });
        } else {
            let cots = [];
            let catts = [];

            readdirSync("./commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return "Unnamed";

                    let name = file.name.replace(".js", "");

                    let des = client.commands.get(name).description;

                    let obj = {
                        cname: `\`${name}\``,
                        des
                    }

                    return obj;
                });

                let dota = new Object();

                cmds.map(co => {
                    dota = {
                        name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                        value: co.des ? co.des : 'No Description',
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            console.log(cots);

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new MessageEmbed()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Use \`e?help\` followed by a command name to get more information on a command.\nFor example: \`e?help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return message.channel.send(combed)
            }

            if (!command) {
                return sendError(`Invalid Command/Category! To see all of my commands, you can just do \`e?help\``, message.channel);
            }

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .addField(
                    "Command:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
                )
                .addField(
                    "Aliases:",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "No aliases for this command."
                )
                .addField(
                    "Usage:",
                    command.usage ?
                    `\`${client.prefix}${command.name} ${command.usage}\`` :
                    `\`${client.prefix}${command.name}\``
                )
                .addField(
                    "Command Description:",
                    command.description ?
                    command.description :
                    "No description for this command."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);
            return message.channel.send({ embeds: [embed] });
        }
    },
};