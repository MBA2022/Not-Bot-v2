const {MessageEmbed} = require('discord.js');
exports.run = async (client, message) => {
if (message.author.bot) return;
      if (message.channel.type == "dm") return message.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed().setDescription("❌" + " **You Need `MANAGE_MESSAGES` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp())
      message.channel.createOverwrite(message.guild.id, {
        SEND_MESSAGES: true
      }).then(() => {
 
        message.reply(new MessageEmbed().setDescription(`**\`\`\`js
🔓 has been unlocked.\`\`\`**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
      });
}