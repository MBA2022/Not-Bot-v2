const { join } = require("path");
module.exports = {
  logsWebhookUrl: process.env.LOGS_WEBHOOK_URL,
  mongo: {
    URI: process.env.MONGO_URI,
    timeout: 10000,
  },
  token: process.env.TOKEN,
  totalShards: "auto",
  clientOptions: {
    intents: [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_BANS",
      "GUILD_EMOJIS_AND_STICKERS",
      "GUILD_WEBHOOKS",
      "GUILD_MESSAGES",
    ],
  },
  i18n: {
    directory: join(__dirname, "locales"),
    extension: "json",
    returnEmptyString: false,
    defaultLocale: "en",
    retryInDefaultLocale: true,
    mustache: ["{{", "}}"],
  },
};
