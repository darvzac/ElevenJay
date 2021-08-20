const { readdirSync } = require('fs');

module.exports = (client) => {
    const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).filter(cmd => cmd.endsWith('.js'));
        for (let cmd of commands) {
            let pull = require(`../commands/${dirs}/${cmd}`);
            client.commands.set(pull.name, pull);
            if (pull.aliases) pull.aliases.forEach(cmd => client.aliases.set(cmd, pull.name));
        };
    };
    ["animal", "anime", "backup", "chatbot", "fun", "games", "image", "info", "moderation", "music", "other", "special"].forEach(cmd => load(cmd));
};