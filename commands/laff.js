/*========================= TODO ========================*


*/

exports.run = async (client, message, args) => {

  message.channel.send({ files: ["./img/laff.png"] });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
};

exports.help = {
  name: "laff",
  category: "Miscellaneou",
  description: "have a laff",
  usage: "laff"
};