const { SlashCommandBuilder } = require('@discordjs/builders');
const {  Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'userinfo',
    description: 'Get Information about a user.',
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

    const userembed = new EmbedBuilder()
        .setColor('#0000ff')
        .setTitle('User Information')
        .setDescription("Here is the information about the user")
        .addFields(
            { name: 'Username', value: user.username },
            { name: 'User ID', value: user.id },
            { name: 'Account Created', value: String(user.createdAt) },
        )
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp();

    
    interaction.reply({embeds: [userembed]})
    
    

    
  },
};