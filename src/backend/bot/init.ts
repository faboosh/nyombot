require("dotenv").config();
const { Client, Intents } = require("discord.js");

function initBot() {
  const intents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ];

  const client = new Client({
    intents,
  });

  client.once("ready", () => console.log("Bot signed in"));
  client.login(process.env.DISCORD_BOT_TOKEN);

  return client;
}

export default initBot;
