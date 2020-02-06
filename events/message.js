// Runs when message is received
module.exports = async (client, message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Load settings
  const settings = message.settings = client.getSettings(message.guild);

  // Ignore if message doesn't start with prefix
  if (message.content.indexOf(settings.prefix) !== 0) return;

  // Separate out arguments
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Check whether the command exists
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd) return;

  // If message was a DM and is not allowed in chat
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("You can't do this in a DM.");

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  //client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args);
};