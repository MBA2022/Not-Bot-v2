const { MongoClient, UpdateResult, DeleteResult } = require("mongodb");
const { error, log } = require("./logger");
const { defaultLocale } = require("./i18n");
const { mongo } = require("./config");
const { Collection } = require("discord.js");
const i18n = require("./i18n");

class Guild {
  /**
   * @param {String} id
   * @param {{ locale: String }} data
   */
  constructor(id, data) {
    this._id = id;
    this.locale = data?.locale || defaultLocale;
  }
}

class DB {
  /**
   * Set a document in a collection in the database
   * @param {String} collection - The collection to set the document in
   * @param {Object} data - The data to set
   * @returns {Promise<UpdateResult>} - The result of the update
   */
  async set(collection, data) {
    return new Promise((resolve, reject) => {
      if (!this.ready) return reject(i18n.get({ path: "db.notReady" }));
      if (typeof data._id !== "string")
        return reject(i18n.get({ path: "db.noId" }));
      const timeout = setTimeout(
        () => reject(i18n.get({ path: "db.timeout" }, { action: "update" })),
        this.timeout
      );
      this.db
        .collection(collection)
        .updateOne({ _id: data._id }, { $set: data }, { upsert: true })
        .then((result) => {
          clearTimeout(timeout);
          log(
            i18n.get(
              { path: "db.updated" },
              {
                collection,
                id: data._id,
                modifiedCount: result.modifiedCount,
                upsertedCount: result.upsertedCount,
              }
            )
          );
          resolve(result);
        })
        .catch(reject);
    });
  }
  /**
   * Get a document by id from a collection in the database
   * @param {String} collection - The collection to get the document from
   * @param {String} id - The id of the document
   * @returns {Promise<Object>} - The document
   */
  async get(collection, id, skipCache = false) {
    return new Promise((resolve, reject) => {
      if (!this.ready) return reject(i18n.get({ path: "db.notReady" }));
      if (typeof id !== "string") return reject(i18n.get({ path: "db.noId" }));
      const timeout = setTimeout(
        () => reject(i18n.get({ path: "db.timeout" }, { action: "read" })),
        this.timeout
      );
      if (!skipCache && this.cache[collection].has(id)) {
        clearTimeout(timeout);
        resolve(this.cache[collection].get(id));
      } else {
        this.db
          .collection(collection)
          .findOne({ _id: id })
          .then((document) => {
            clearTimeout(timeout);
            resolve(document);
          })
          .catch(reject);
      }
    });
  }
  /**
   * Delete a document by id from a collection in the database
   * @param {String} collection
   * @param {String} id
   * @returns {Promise<DeleteResult>}
   */
  async delete(collection, id) {
    return new Promise((resolve, reject) => {
      if (!this.ready) return reject(i18n.get({ path: "db.notReady" }));
      if (typeof id !== "string") return reject(i18n.get({ path: "db.noId" }));
      const timeout = setTimeout(
        () => reject(i18n.get({ path: "db.timeout" }, { action: "delete" })),
        this.timeout
      );
      this.db
        .collection(collection)
        .deleteOne({ _id: id })
        .then((result) => {
          clearTimeout(timeout);
          log(
            i18n.get(
              { path: "db.deleted" },
              {
                collection,
                id,
                deletedCount: result.deletedCount,
              }
            )
          );
          resolve(result);
        })
        .catch(reject);
    });
  }
  /**
   * @param {String} URI - The URI of the database
   * @param {Number} timeout - The timeout of functions
   */
  constructor(URI, options) {
    this.URI = URI;
    this.ready = false;
    this.timeout = options?.timeout || 5000;

    this.cache = {
      guilds: new Collection(),
    };

    this.Guild = Guild;

    this.client = new MongoClient(URI, { ignoreUndefined: true });

    this.client
      .connect()
      .then(async () => {
        log(i18n.get({ path: "db.connected" }));
        this.db = this.client.db();
        this.ready = true;

        this.changeStream = this.db.watch([
          {
            $match: {
              operationType: { $in: ["delete", "insert", "replace", "update"] },
            },
          },
        ]);
        this.changeStream.on("change", async (change) => {
          if (change.operationType === "delete")
            this.cache[change.ns.coll]?.delete(change.documentKey._id);
          else if (change.operationType === "update")
            this.cache[change.ns.coll]?.set(
              change.documentKey._id,
              await this.get(change.ns.coll, change.documentKey._id, true)
            );
          else
            this.cache[change.ns.coll]?.set(
              change.documentKey._id,
              change.fullDocument
            );
        });
      })
      .catch(error);
  }
}

module.exports = new DB(mongo.URI, mongo.timeout);
