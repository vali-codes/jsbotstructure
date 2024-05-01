const { EmbedBuilder } = require('discord.js');
const translate = require('translate-google');

module.exports = {
    data: {
      name: 'translate',
      description: 'Translate your text!',
      options: [
        {
        name: 'message',
        description: 'The news',
        type: 3, 
        required: true,
      },
      {
        name: 'language',
        description: 'The language you want!',
        type: 3,
        required: true,
        choices: [
          { name: 'Spanish', value: 'es' },
          { name: 'French', value: 'fr' },
          { name: 'German', value: 'de' },
          { name: 'English', value:'en'}
        ],
      },
      ],
    },
    async execute(interaction) {
      const { member, options } = interaction;
      const word = options.getString('message');
      const language = options.getString('language');
      const translated = await translate(word,{to: language})
      const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Translation')
      .setDescription("Please carefully read the provided information below. There can always be typing errors.")
      .addFields(
        { name: 'Translation', value: translated }
      )
      .setTimestamp()
  
      const requiredRole = member.roles.cache.some(role => role.name === 'Admin');
      if (!requiredRole) {
        return interaction.reply('You do not have permission to use this command.');
      }
      try {
        
        interaction.reply({ embeds: [embed]});
        
      } catch (error) {
        console.error('Error purging channel:', error);
        
      }
    },
  };