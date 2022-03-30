module.exports = {
    once: true,
    async execute(client) {
      console.log(`[ ${client.user.username} ] is ready`);
      await client.user.setStatus('idle');
      client.user.setActivity(client.config.prefix + "help || MBA!!", {
        type: 'PLAYING'
      })
    },
  };