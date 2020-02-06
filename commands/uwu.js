// owo
const owoify = require('owoify-js').default;

/*========================= TODO ========================*
***   Ignore emojis somehow

*/


exports.run = async (client, message, args) => {

  // Need to grab last 2 messages and .last() to get message to transform
  message.channel.fetchMessages({ limit: 2 })
    .then(messages => {
      if (messages.last().attachments.size > 0) {
        message.channel.send("I can't do that on picture ya dingus");
      }
      else {
        const lastMessage = messages.last().content.trim();
        const newMessage = owoify(lastMessage, 'uwu');
        message.channel.send(newMessage);
      }
    });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["owo"],
};

exports.help = {
  name: "uwu",
  category: "Weeb shit",
  description: "UwU",
  usage: "uwu"
};