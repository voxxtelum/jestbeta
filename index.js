// Load up the discord.js library
const Discord = require("discord.js");

// Reading file reading
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

// Store maps in memory neat
const Enmap = require("enmap");

// Create client
const client = new Discord.Client();

// Load config file
client.config = require("./config/config.js");

// Load logger so I can see more errors more better
// because I am dumb and I hate my life
client.logger = require("./addons/Logger.js");

// Load extra functions
// Can add some neat little gadgets there
require("./addons/functions.js")(client);

// Store commands and aliases if they have
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({ name: "settings" });

const init = async () => {

  // Load commands from ./commands
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading ${cmdFiles.length} commands.`);
  cmdFiles.forEach(c => {
    if (!c.endsWith(".js")) return;
    const response = client.loadCommand(c);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });

  // Here we login the client.
  client.login(client.config.token);

  // End top-level async/await function.
};

init();