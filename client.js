const Bot = require("./bot");
const { token, clientOptions } = require("./config");

const client = new Bot({ clientOptions });

client.login(token);
