const suvmj = require('../config/sudoers.json');
// Let's get some random number shit
const Random = require('random-js').Random;
const random = new Random();

exports.run = async (client, message, args) => {
  if (suvmj.includes(message.author.id)) {
    const messageAuthor = `<@${message.author.id}>`;
    message.channel.send(`${messageAuthor} rolls 69 (1-${args[0]})`);
  } else {
    const rollResult = await client.rollNumbers(message, args);
    message.channel.send(rollResult);
    message.author.send(`*teleports behind you* What do you think you're doing, kiddo? There is no cheating in this dojo.`);
    client.logger.warn(`${message.author.username} is trying to cheat!`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  // require author.id match one in /config/sudoers.json
  sudoers: true,
  aliases: ["roli", "roii"],
};

exports.help = {
  name: "roil",
  category: "fun",
  description: "69xD",
  usage: "roil"
};