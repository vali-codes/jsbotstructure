const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
      name: 'announce',
      description: 'Announce something',
      options: [
        {
        name: 'message',
        description: 'The message you want to announce.',
        type: 3, 
        required: true,
      },
        {
            name: 'channel',
            description: 'Please select a channel!',
            type: 7,
            required: true,
        },
        
      ],
    },
    async execute(interaction) {
      const { member, options } = interaction;
      const channel = options.getChannel('channel');
      const word = options.getString('message');
      const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Announcement')
      .setDescription("New Announcement!")
      .addFields(
        { name: 'Message', value: word }
      )
      .setTimestamp()
    const requiredRole = member.roles.cache.some(role => role.name === 'Admin');
    if (!requiredRole) {
        return interaction.reply('You do not have permission to use this command. Required role: Admin.');
    }
      try {
        interaction.deleteReply();
        channel.send("@everyone")
        channel.send({ embeds: [embed]});
        interaction.deferReply();
      } catch (error) {
        console.error('Error purging channel:', error);
        
      }
    },
  };