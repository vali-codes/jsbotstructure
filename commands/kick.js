const { SlashCommandBuilder } = require('@discordjs/builders');
const {  Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'kick',
    description: 'Remove a user from the server.',
    options: [
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
    const userOption = options.getUser('user'); 
    const user = userOption;
    const kickmember = interaction.guild.members.cache.get(user.id);
    

    const embed = new EmbedBuilder() 
      .setColor('#E67E22')
      .setTitle('Kick')
      .setDescription("You have been kicked from the server!")
      .addFields(
        { name: 'Staff Member', value: `<@${member.user.id}>` }
      )
      .setTimestamp();

    const requiredRole = member.roles.cache.some(role => role.name === 'Admin');
    if (!requiredRole) {
      return interaction.reply({ content: 'You do not have permission to use this command, required Role: Admin', ephemeral: true });
    }

    if (user) {
      try {
       
       

        await user.send({ embeds: [embed] });
        const confirmed = new EmbedBuilder() 
          .setColor('#dd6800')
          .setTitle('User has been kicked from the server')
          .setTimestamp();

        interaction.reply({ embeds: [confirmed], ephemeral: true });
        console.log('Message sent to the user successfully.');
        console.log('User warnings updated.');
        await kickmember.kick();
      } catch (error) {
        const declined = new EmbedBuilder() 
          .setColor('#ED4245')
          .setTitle('User could not be kicked')
          .setTimestamp();

        interaction.reply({ embeds: [declined] });
        console.error('Failed to send a message to the user:', error);
      }
    } else {
      interaction.reply({ content: 'This user does not exist!' });
    }
  },
};