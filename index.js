/**
 *
 * @name Not-Bot // 
 * @author MBA & i8bou3<mohdbm.amr@gmail.com ||i8bou3@gmail.com>
 * @license MIT
 * @copyright (c) 2022 i8bou3 & MBA
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
