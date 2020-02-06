// wordpos
const WordPOS = require('wordpos'),
      wordpos = new WordPOS();

/*======================================================*
       /$$                                    
      | $$                                    
      | $$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$$
      | $$__  $$ /$$__  $$ /$$__  $$ /$$_____/
      | $$  \ $$| $$  \ $$| $$  \ $$|  $$$$$$ 
      | $$  | $$| $$  | $$| $$  | $$ \____  $$
      | $$$$$$$/|  $$$$$$/|  $$$$$$$ /$$$$$$$/
      |_______/  \______/  \____  $$|_______/ 
                           /$$  \ $$          
                          |  $$$$$$/          
                           \______/      the original
*=======================================================*

*========================= TODO ========================*
***** Fix consecutive transforms on duplicate words
****  Add a minimum word requirement as a % of total words
**    Add extensible transform() that captures all transform conditions
*     Allow bogs to be tab-targeted
*     Add command to add(emojiID) to config
*/

exports.run = async (client, message, args, level) => {

  // Fetch !command message and previous message
  message.channel.fetchMessages({ limit: 2 })
    .then(messages => {

      // Sort to select message before command
      const lastMessage = messages.last().content.trim().split(/[ ,]+/);
      // Don't do pictures
      if (messages.last().attachments.size > 0) {
        message.channel.send("I can't do that on picture ya dingus");
      }
      else {

        // Get number of words in message
        // const messageLength = lastMessage.length;
        
        // Create empty new message for bot to send
        const newMessage = []

        // Chance to turn emoji
        const nounChance = .2,
              verbChance = .25,
              adjChance = .3;

        // Grab random emoji from emoji.json based on type
        const grabRandEmoji = (emojiType) => {
          const keys = Object.keys(emojiType),
            randKey = keys[Math.floor(Math.random() * keys.length)],
            randEmoji = emojiType[randKey];
          return randEmoji;
        };

        // Create place for indices of changed words to go
        const replacedWords = [];

        for (let word of lastMessage) {
          // Get index of word we're working on
          let wordIndex = lastMessage.indexOf(word);
          // Offset checkIndex checks if pervious word was changed to prevent consecutive emojis
          let checkIndex = wordIndex - 1;
          // Don't transform first word in message
          if (wordIndex == 0) {
            newMessage.push(word);
          }
          // Don't transform words shorter than 4 characters
          else if (word.length < 4) {
            newMessage.push(word);
          }
          // Check if previous word was transformed before continuing
          else if (!replacedWords.includes(checkIndex)) {
            if (wordpos.isNoun(word)) {
              if (Math.random() < nounChance) {
                // Add index of transformed word to the replacedWords array
                replacedWords.push(wordIndex);
                newMessage.push(grabRandEmoji(emoji.noun));
              } else if (wordpos.isVerb(word)) {
                if (Math.random() < verbChance) {
                  replacedWords.push(wordIndex);
                  newMessage.push(grabRandEmoji(emoji.verb));
                } else if (wordpos.isAdjective(word)) {
                  if (Math.random() < adjChance) {
                    replacedWords.push(wordIndex);
                    newMessage.push(grabRandEmoji(emoji.adj));
                  } else {
                    newMessage.push(word);
                  }
                }
              }
            }
          }
          else {
            newMessage.push(word);
          }
        }

        // How many words were replaced?
        //const replacedLen = replacedWords.length;

        message.channel.send(newMessage.join(" ")).catch(console.error);
        
        //message.channel.send(newMessage.join(" ") + " | Total: " + messageLength + " | Replaced: " + replacedLen);

        //console.log(newMessage.join(" ") + " | Total: " + messageLength + " | Replaced: " + replacedLen);
      }
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
};

exports.help = {
  name: "bogs",
  category: "bogs",
  description: "play with some bogs",
  usage: "bogs"
};