const {  Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'dm',
    description: 'Send a private message to a user via the bot',
    options: [
      {
        name: 'user',
        description: 'User',
        type: 6,
        required: true,
      },
      {
        name: 'message',
        description: 'The messge that you want to send',
        type: 3,
        required: true,
      },

    ],
  },
  async execute(interaction) {
    const { member, options } = interaction;
    const userOption = options.getUser('user'); 
    const message = options.getString('message');
    const user = userOption;
    
    
    

    const embed = new EmbedBuilder() // embed message with information
      .setColor('#0000ff')
      .setTitle('Message from the Staff')
      .setDescription("Please read the message carefully")
      .addFields(
        { name: 'Staff Member', value: `<@${member.user.id}>` },
        {name: 'Message', value:  message}
      )
      .setTimestamp();

    const requiredRole = member.roles.cache.some(role => role.name === 'Admin'); // get the role
    if (!requiredRole) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    } // check if user has got the role

    if (user) {
      try {
        await user.send({ embeds: [embed] }); // send the embed to the user
        await interaction.reply({ content: 'Message sent to the user successfully.', ephemeral: true });
      } catch (error) {
        console.error('Failed to send a message to the user:', error);
      }
    } else {
      interaction.reply({ content: 'This user does not exist!' });
    }
  },
};