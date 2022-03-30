const {MessageEmbed} = require('discord.js');
exports.run = async (client, ncr_niro) => {
if (ncr_niro.author.bot) return;
      if (ncr_niro.channel.type == "dm") return ncr_niro.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${ncr_niro.author.tag}`).setTimestamp())
      ncr_niro.delete({ timeout: 0 })
      if (!ncr_niro.member.hasPermission('MANAGE_GUILD')) return ncr_niro.channel.send(new MessageEmbed().setDescription("❌" + " **You Need `MANAGE_GUILD` Permission To Use This Command!**").setFooter(`Request By ${ncr_niro.author.tag}`).setTimestamp());
      if (!ncr_niro.guild.member(client.user).hasPermission('MANAGE_GUILD')) return ncr_niro.channel.send(new MessageEmbed().setDescription("❌" + " **I Can't Clear The Cahct In This Server Becuse I Don't Have `MANAGE_GUILD` Permission!**").setFooter(`Request By ${ncr_niro.author.tag}`).setTimestamp());
 
      let args = ncr_niro.content.split(" ").slice(1)
      let messagecount = parseInt(args);
      if (args > 100) return ncr_niro.channel.send(`\`\`\`javascript
    i cant delete more than 100 messages 
    \`\`\``).then(messages => messages.delete(5000))
      if (!messagecount) messagecount = '100';
      ncr_niro.channel.messages.fetch({ limit: 100 }).then(messages => ncr_niro.channel.bulkDelete(messagecount)).then(messages => {
ncr_niro.channel.send(new MessageEmbed().setDescription(`\`\`\`js
${messages.size} messages cleared\`\`\``)).then(messages =>
          messages.delete({ timeout: 5000 }));
      })
}
