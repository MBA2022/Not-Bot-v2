exports.run = (client, message, args) => {
    const {MessageEmbed} = require('discord.js')
    let user = {};
    if (message.mentions.users.first()) user = message.mentions.users.first();
    else user = message.author;
   
    message.channel.send(new MessageEmbed()
      .setAuthor(message.author.tag, user.avatarURL({ dynamic: true }))
      .setDescription(`**[Avatar Link](${user.avatarURL()})**`)
      .setImage(user.avatarURL({ dynamic: true }))
      .setColor("GRAY")
      .setFooter(`Requested by ${message.author.tag}`, user.avatarURL({ dynamic: true }))
    );
  };
  