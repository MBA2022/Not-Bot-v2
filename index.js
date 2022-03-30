/**
 *
 * @name imagine-a-bot
 * @author 8bou3 <i8bou3@gmail.com>
 * @license MIT
 * @copyright (c) 2022 8bou3
 *
 */
require("dotenv").config();
const { log, error } = require("./logger.js");

process.on("unhandledRejection", (r, p) => error(r, p));
process.on("uncaughtException", (e, o) => error(e, o));
process.on("uncaughtExceptionMonitor", (e, o) => error(e, o));
process.on("multipleResolves", (t, p, v) => error(t, v, p));

const { token, totalShards } = require("./config.js");
const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./client.js", { token, totalShards });

manager.on("shardCreate", (shard) => log(`Launched shard ${shard.id}`));
manager.spawn();
