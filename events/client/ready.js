const config = require("../../configs/config.json");
const db = require('quick.db');

module.exports = (client) => {
	
  console.log(`${client.user.tag} online!`);
	console.log(`${client.users.cache.size} Users and ${client.guilds.cache.size} Servers`)
  const status = [
    `e?help | JackGrizz`, 
    `${client.guilds.cache.size} Server`,
    `ko-fi.com/alvintungga`
    ]
  setInterval(() => {
    client.user.setActivity(status[Math.floor(Math.random() * status.length)], {type : "WATCHING"})
  }, 5000)
};