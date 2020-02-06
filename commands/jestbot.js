/*========================= TODO ========================*


*/
exports.run = async (client, message, args) => {

  let helpMessage = `Welcome to Jestbot 2.0!
  To play with bogs, type **!bogs**. For a laff, type **!laff**.
  To make everyone around you feel disgusted and resent your presence type **!uwu**.`;
  message.channel.send(helpMessage);

  /* Keeping here as a basic embed template
  const newEmbed = {
    color: 0x0099ff,
    title: 'Jestbot Beta',
    author: {
      name: 'voxxtelum',
      url: 'https://github.com/voxxtelum'
    },
    description: 'laffing at bogs since 2020'

  }
  message.channel.send({ embed: newEmbed });

  */


};

exports.conf = {
  // Enbable/disable command
  enabled: true,
  // set true if only usable in normal channels
  // false lets bot respond to DMs
  guildOnly: true,
  // bot also reacts to these commands
  aliases: [],
};

exports.help = {
  // name of command that triggers response
  name: "jestbeta",
  // bot category, might want to use this somehow later
  // with a !help command to tell people how to use it
  category: "Miscellaneous",
  // same as above; pretty explanatory
  description: "wat are bogs",
  // also same as above, just useful for !help command
  usage: "jestbot"
};