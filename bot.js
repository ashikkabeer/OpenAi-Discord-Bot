
const { ask } = require("./ai.js");
require('dotenv').config()
const token = process.env.TOKEN
const { Client, Events, GatewayIntentBits } = require('discord.js')
const client = new Client({
    intents:
      [GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent]
  });
  
  client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
  });
  
  client.on(Events.MessageCreate, async message => {
    if (message.content.substring(0, 1) === "!") {
      const prompt = message.content.substring(1); 
      const answer = await ask(prompt); 
      client.channels.fetch(message.channelId).then(channel => channel.send(answer));
    }
  });
  
  client.login(token);
