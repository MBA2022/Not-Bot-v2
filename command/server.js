const { MessageEmbed } = require('discord.js');
 
exports.run = async (guild, ncr_niro) => {
  if (!ncr_niro.channel.guild) return ncr_niro.channel.send('This is for servers only');
 
  const text = ncr_niro.guild.channels.cache.filter(r => r.type === "text").size
  const voice = ncr_niro.guild.channels.cache.filter(r => r.type === "voice").size
  const chs = ncr_niro.guild.channels.cache.size
  const avaibles = ncr_niro.guild.features.map(features => features.toString()).join("\n")
 
  const roles = ncr_niro.guild.roles.cache.size
 
  const online = ncr_niro.guild.members.cache.filter(m =>
    m.presence.status === 'online'
  ).size
 
  const idle = ncr_niro.guild.members.cache.filter(m =>
    m.presence.status === 'idle'
  ).size
 
  const offline = ncr_niro.guild.members.cache.filter(m =>
    m.presence.status === 'offline'
  ).size
 
  const dnd = ncr_niro.guild.members.cache.filter(m =>
    m.presence.status === 'dnd'
  ).size
 
  const black = new MessageEmbed()
    .setAuthor(ncr_niro.guild.name, ncr_niro.author.avatarURL({dynamic: true, format: 'png', size: 1024}))
    .setColor('BLACK')
    .addFields(
      {
        name: `🆔 Server ID`,
        value: `${ncr_niro.guild.id}`,
        inline: true
 
      },
      {
        name: `📆 Created On`,
        value: ncr_niro.guild.createdAt.toLocaleString(),
        inline: true
      },
      {
        name: `👑 Owner By`,
        value: `${ncr_niro.guild.owner}`,
        inline: true
 
      },
      {
        name: `👥 Members (${ncr_niro.guild.memberCount})`,
        value: `**${online}** Online \n **${ncr_niro.guild.premiumSubscriptionCount}** Boosts ✨`,
        inline: true
      },
      {
        name: `💬 Channels (${chs})`,
        value: `**${text}** Text | **${voice}** Voice`,
        inline: true
      },
      {
        name: `🌍 Others`,
        value: `**Region:** ${ncr_niro.guild.region}\n**Verification Level:** ${ncr_niro.guild.verificationLevel}`,
        inline: true
      },
      {
        name: `🔐 Roles (${roles})`,
        value: `To see a list with all roles use #roles`,
        inline: true
      },
    )
    .setFooter('Ncr Codes')
  ncr_niro.channel.send(black)
 
}