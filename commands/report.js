const { SlashCommandBuilder } = require('@discordjs/builders');
const {  Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'report',
    description: 'Report a user for breaking the rules.',
    options: [
      {
        name: 'user',
        description: 'User',
        type: 6,
        required: true,
      },
      {
        name: 'message',
        description: 'Reason',
        type: 3,
        required: true,
      },
      {
        name: 'links',
        description: 'Links with images of proof',
        type: 3,
        required: false,
      },
    ],
  },
  async execute(interaction) {
    const { member, options } = interaction;
    const reason = options.getString('message');
    const userOption = options.getUser('user'); 
    const links = options.getString('links');
    const user = userOption;

    

        const embed = new EmbedBuilder() 
        .setColor('#ff0000')
        .setTitle('New Report')
        .setDescription("A user has been reported")
        .addFields(
        { name: 'Reason', value: reason },
        { name: 'Reported User', value: `<@${user.id}>`},
        { name: 'Reported by', value: `<@${interaction.user.id}>` }
        )
        .setTimestamp();

        if (links !== null) {
            embed.addField('Links', links);
        }
        await interaction.user.send({ content: 'Report sent to the staff successfully.', ephemeral: true });
      
        
        const channel = interaction.guild.channels.cache.get(process.env.MODLOG_ID);
        if (!channel) {
            return interaction.reply({ content: 'The channel does not exist!', ephemeral: true });
        }
        await channel.send({ embeds: [embed] });   
        
        await interaction.deferReply();
        await interaction.followUp({ content: 'Report sent to the staff successfully.', ephemeral: true });
   
  },
};