// Let's get some random number shit
const Random = require('random-js').Random;
const random = new Random();

exports.run = async (client, message, args) => {
  const messageAuthor = '<@' + message.author.id + '>';
  if (!args.length) {
    // Basic /roll with no arguments
    const roll = random.integer(1, 100);
    message.channel.send(messageAuthor + ' rolls ' + roll + ' (1-100)');
  } else {
    // Joins args
    const longArgs = args.join(" ");

    // Create array of all integers in argument
    const integers = longArgs.match(/[0-9]+/g);

    // If no integers were found
    if (!integers) {
      message.channel.send('Hey ' + messageAuthor + ', there no number');
    } else if (integers.length == 1) {
      // If only 1 integer was found
      const intMax = Math.abs(parseInt(integers[0]));
      const roll = random.integer(1, intMax);
      message.channel.send(messageAuthor + ' rolls ' + roll + ' (1-' + intMax + ')');
    } else if (integers.length == 2) {
      // If integers has 2 args
      const intMin = integers[0];
      const intMax = integers[1];
      const roll = random.integer(intMin, intMax);
      //console.log("2 integers");
      message.channel.send(messageAuthor + ' rolls ' + roll + ' (' + intMin + '-' + intMax + ')');
    } else {
      // If integers has > 2 args
      message.channel.send('Hey ' + messageAuthor + ', you have to give me 0, 1, or 2 number ya dingus');
    }
  }
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
  usage: "roll"
};