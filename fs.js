const { Collection } = require("discord.js");
const fs = require("fs");
const { basename, extname } = require("path");

module.exports = Object.assign(fs, {
  /**
   * Load files from directory and return them as Collection
   * @param {String} dir - the directory to load files from
   * @param {String[] | String} suffix - file extension(s) to load
   * @param {{ oneCollection: Boolean, exclude: RegExp }} options - oneCollection: combines the subFolders to the main collection
   * @returns {Collection<String, any>} - Collection<fileName, any>
   */
  loadFiles(dir, suffix, options) {
    let collection = new Collection();

    if (!fs.existsSync(dir)) return collection;
    if (typeof suffix === "string") suffix = [suffix];
    suffix.forEach((ext) => ext.replace(/^\.+/, ""));

    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      if (options?.exclude?.test(`${dir}/${file.name}`)) continue;
      if (file.isDirectory()) {
        let subDir = fs.loadFiles(`${dir}/${file.name}`, suffix, options);
        if (options?.oneCollection) collection = collection.concat(subDir);
        else collection.set(file.name, subDir);
      } else if (suffix.includes(extname(file.name).slice(1))) {
        collection.set(
          basename(file.name, extname(file.name)).toLowerCase(),
          require(`${dir}/${file.name}`)
        );
      }
    }

    return collection;
  },
});
