const suvmj = require('../config/sudoers.json');

exports.run = async (client, message, args) => {
  if (suvmj.includes(message.author.id)) {
    //const messageAuthor = '<@' + message.author.id + '>';
    const messageAuthor = `<@${message.author.id}>`;
    client.logger.warn(`${message.author.username} is trying to cheat!`);
    message.channel.send(messageAuthor + ' rolls 69 (1-' + args[0] + ')');
  } else {
    client.logger.warn(`${message.author.username} is trying to cheat!`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
};

exports.help = {
  name: "roil",
  category: "fun",
  description: "69xD",
  usage: "roil"
};