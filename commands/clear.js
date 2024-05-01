module.exports = {
    data: {
      name: 'clear',
      description: 'Clear a channel',
      options: [
        {
          name: 'amount',
          description: 'Number of messages to clear',
          type: 4,
          required: true,
        },
      ],
    },
    async execute(interaction) {
      const { member, channel } = interaction;
      const { amount } = interaction.options.getInteger('amount');
  
      const requiredRole = member.roles.cache.some(role => role.name === 'Admin');
      if (!requiredRole) {
        return interaction.reply('You do not have permission to use this command.');
      }
      try {
        const messages = await channel.messages.fetch({ limit: amount });
        await channel.bulkDelete(messages, true);
        return interaction.reply('Channel purged successfully', ephemeral= true);
      } catch (error) {
        console.error('Error purging channel:', error);
        return interaction.reply('An error occurred while purging the channel.');
      }
    },
  };
  
    