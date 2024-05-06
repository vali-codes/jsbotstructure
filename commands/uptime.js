const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('See how long the bot has been running for!'),
  async execute(interaction) {
    const time = process.uptime();
    const uptime = new Date(time * 1000).toISOString().substr(11, 8);
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Uptime')
      .setDescription("Our bot has been online for")
      .addFields(
        { name: 'Duration', value: uptime}
      )
      .setTimestamp()
    
      
    interaction.deleteReply();
    interaction.channel.send({ embeds: [embed]});
    interaction.deferReply();
  },
};