const { Client, ClientOptions } = require("discord.js");
const { loadFiles } = require("./fs");
const { join } = require("path");

class Bot extends Client {
  /**
   * @param {{ clientOptions: ClientOptions }} options
   */
  constructor({ clientOptions }) {
    super(clientOptions);

    this.events = loadFiles(join(__dirname, "events"), "js", {
      oneCollection: true,
    });
    this.events.each((event) => {
      if (event.once)
        this.once(event.name, (...args) => event.execute(this, ...args));
      else this.on(event.name, (...args) => event.execute(this, ...args));
    });
  }
}

module.exports = Bot;

