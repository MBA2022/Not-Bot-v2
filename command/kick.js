const {MessageEmbed} = require('discord.js');
exports.run = async (client, message) => {
if (message.author.bot) return;
      if (message.channel.type == "dm") return message.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
      const kicks = message.content.split(" ").slice(2).join(" ")
      if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(new MessageEmbed().setDescription("❌" + " **I Can't Kick Any Member In This Server Becuse I Don't Have `KICK_MEMBERS` Permission!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
      if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new MessageEmbed().setDescription("❌" + " **You Need `KICK_MEMBERS` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
 
      const user = message.mentions.users.first();
      if (!user) return message.channel.send(new MessageEmbed().setDescription("❌" + " **Please Mention Same One!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
      if (!kicks) return message.channel.send(new MessageEmbed().setDescription("❌" + " **Please Type Reason!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
      message.guild.member(user).kick(kicks, user).then(() => {
        message.channel.send("🤔" + " **Processing The Kick Function...**").then((m) => {
          m.edit("✅" + " **Processing is complete**")
        })
        message.channel.send(new MessageEmbed().setDescription("✅" + ` **${user} Has Ben Kicked By <@!${message.author.id}>**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
      })
}