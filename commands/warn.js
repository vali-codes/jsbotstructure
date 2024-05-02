const { SlashCommandBuilder } = require('@discordjs/builders');
const {  Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'warn',
    description: 'Warn a user.',
    options: [
      {
        name: 'message',
        description: 'Reason',
        type: 3,
        required: true,
      },
      {
        name: 'user',
        description: 'User',
        type: 6,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const { member, options } = interaction;
    const reason = options.getString('message');
    const userOption = options.getUser('user'); 
    const user = userOption;

    if (reason === null) {
      return interaction.reply('No reason given! Please provide a reason.');
    }

    const embed = new EmbedBuilder() 
      .setColor('#E67E22')
      .setTitle('Warning')
      .setDescription("You have been warned!")
      .addFields(
        { name: 'Reason', value: reason },
        { name: 'Staff Member', value: `<@${member.user.id}>` }
      )
      .setTimestamp();

    const requiredRole = member.roles.cache.some(role => role.name === 'Admin');
    if (!requiredRole) {
      return interaction.reply({ content: 'You do not have permission to use this command, required Role: Admin', ephemeral: true });
    }

    if (user) {
      try {
        const guild = interaction.guild; 
        const timeoutRole = guild.roles.cache.find(role => role.name === 'Muted');

        await user.send({ embeds: [embed] });
        const confirmed = new EmbedBuilder() 
          .setColor('#dd6800')
          .setTitle('Warn sent')
          .setTimestamp();

        interaction.reply({ embeds: [confirmed], ephemeral: true });
        console.log('Message sent to the user successfully.');
        console.log('User warnings updated.');
      } catch (error) {
        const declined = new EmbedBuilder() 
          .setColor('#ED4245')
          .setTitle('Warn could not be delivered')
          .setTimestamp();

        interaction.reply({ embeds: [declined] });
        console.error('Failed to send a message to the user:', error);
      }
    } else {
      interaction.reply({ content: 'This user does not exist!' });
    }
  },
};