exports.run = async (client, message, args) => {
  const rollResult = await client.rollNumbers(message, args);
  message.channel.send(rollResult);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: "roll",
  category: "Miscellaneous",
  description: "Rolls a number between 1 and 100, or a custom range.",
  usage: "roll, roll x, roll x-y, roll x y"
};