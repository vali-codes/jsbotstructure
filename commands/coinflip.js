const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Heads or Tails? :)'),
  async execute(interaction) {
    const options = ['Heads', 'Tails']
    const choose = options[Math.floor(Math.random() * options.length)];
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Result')
      .setDescription("Heads? or Tails?")
      .addFields(
        { name: 'Result', value: choose}
      )
      .setTimestamp()
    interaction.deleteReply();
    interaction.channel.send({ embeds: [embed]});
    interaction.deferReply();
  },
};