
const {  Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'ban',
    description: 'Ban a user from the server.',
    options: [
      {
        name: 'user',
        description: 'User',
        type: 6,
        required: true,
      },
      {
        name: 'reason',
        description: 'Reason',
        type: 3,
        required: true,
      },

    ],
  },
  async execute(interaction) {
    const { member, options } = interaction;
    const userOption = options.getUser('user'); 
    const user = userOption;
    const banreason = options.getString('reason');
    const banmember = interaction.guild.members.cache.get(user.id);
    

    const embed = new EmbedBuilder() 
      .setColor('#ff0000')
      .setTitle('Ban')
      .setDescription("You have been banned from the server!")
      .addFields(
        { name: 'Staff Member', value: `<@${member.user.id}>` },
        {name: 'Reason', value: banreason}
      )
      .setTimestamp();

    const requiredRole = member.roles.cache.some(role => role.name === 'Admin');
    if (!requiredRole) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    if (user) {
      try {
       
       

        await user.send({ embeds: [embed] });
        const confirmed = new EmbedBuilder() 
          .setColor('#ff0000')
          .setTitle('User has been banned from the server')
          .setTimestamp();

        interaction.reply({ embeds: [confirmed], ephemeral: true });
        console.log('Message sent to the user successfully.');
        await banmember.ban({reason: banreason}); 
      } catch (error) {
        const declined = new EmbedBuilder() 
          .setColor('#ED4245')
          .setTitle('User could not be banned')
          .setTimestamp();

        interaction.reply({ embeds: [declined] });
        console.error('Failed to send a message to the user:', error);
      }
    } else {
      interaction.reply({ content: 'This user does not exist!' });
    }
  },
};