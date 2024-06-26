
const { Client, Collection, GatewayIntentBits, Embed} = require('discord.js');
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
const modlogchannelid = process.env.MODLOG_ID;
const modlogchannel = client.channels.cache.get(modlogchannelid);


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

  client.on('guildMemberAdd', async member => {
    const channel = modlogchannel
    if (!channel) return; 
    const welcomeEmbed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('Welcome new Member')
      .setDescription(`Welcome to the server ${member}!`)
      .addFields(
      {name: 'Important: ', value: 'Please take a look at our rules and guidelines in the channel for it'},
    )
    .setTimestamp();
    channel.send({ embeds: [welcomeEmbed] });
  }
  );

client.once('ready', () => {
  console.log('Ready!');
})



client.login(process.env.TOKEN);