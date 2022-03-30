const { WebhookClient } = require("discord.js");
const { logsWebhookUrl } = require("./config");

class Logger {
  log = (message) =>
    console.log(`[${new Date().toLocaleTimeString()}]`, message);
  warn = (message) =>
    console.warn(`[${new Date().toLocaleTimeString()}]`, message);
  error = (message) =>
    console.error(`[${new Date().toLocaleTimeString()}]`, message);
  /**
   * @param {{ webhookUrl: String }} options
   */
  constructor(options) {
    if (options?.webhookUrl) {
      this.webhook = new WebhookClient({ url: options?.webhookUrl });
      this.log = (message) => {
        const time = `[${new Date().toLocaleTimeString()}]`;
        this.webhook.send(`${time} ${message}`);
        console.log(time, message);
      };
      this.warn = (message) => {
        const time = `[${new Date().toLocaleTimeString()}]`;
        this.webhook.send(`${time} **(WARN)** ${message}`);
        console.warn(time, message);
      };
      this.error = (message) => {
        const time = `[${new Date().toLocaleTimeString()}]`;
        this.webhook.send(`${time} **(ERROR)** ${message}`);
        console.error(time, message);
      };
    }
  }
}

module.exports = new Logger({ webhookUrl: logsWebhookUrl });
