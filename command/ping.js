const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply(`**\`\`\`js
            Time taken: ${Date.now() - start} ms
            Discord API: ${client.ws.ping.toFixed(0)} ms\`\`\`**`);
	},
};