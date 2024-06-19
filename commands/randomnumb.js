const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rn')
    .setDescription('Generate a random number between 1 and 1000.'),
  async execute(interaction) {
    const number = Math.floor(Math.random() * 1000) + 1;
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Number')
      .setDescription("Here is your random number")
      .addFields(
        { name: 'Number:', value: number },
        {name: 'Requested by: ', value: interaction.user.username}
      )
      .setTimestamp()
    
      
    interaction.deleteReply();
    interaction.channel.send({ embeds: [embed]});
    interaction.deferReply();
  },
};