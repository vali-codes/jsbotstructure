const { Channel } = require('diagnostics_channel');
const { Client, Collection, GatewayIntentBits, ActivityType, Events, EmbedBuilder, PermissionsBitField, Embed, StringSelectMenuBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Permissions, ChannelType } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const client = new Client({ intents: [ 
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));



const childProcess = spawn('node', ['slashcommandHandler.js']);
childProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

childProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

childProcess.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});








for (const file of commandFiles) {
    try {
      const command = require(`./commands/${file}`);
      client.commands.set(command.data.name, command);
    } catch (error) {
      console.error(`Error loading command file: ${file}`, error);
    }
  }
  
  
  
  
  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const command = client.commands.get(interaction.commandName);
  
    if (!command) return;
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
    }
    
  });
  









client.once('ready', () => {
  console.log('Ready!');
})



client.login(process.env.TOKEN);