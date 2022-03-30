const { i18n } = require("./config");
const { loadFiles } = require("./fs");

class I18n {
  /**
   * Escape RegExp
   * @param {String} string - RegExp to escape
   * @returns {String} - The escaped RegExp
   */
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }
  /**
   * Get RegExp to match a string with mustache
   * @param {String} string - String to match
   * @returns {RegExp} - The RegExp
   */
  mustacheRegex(string) {
    return new RegExp(
      this.escapeRegExp(this.mustache[0]) +
        string +
        this.escapeRegExp(this.mustache[1]),
      "g"
    );
  }
  /**
   * Get translation
   * @param {String} path - Path to the translation e.g. "user.name"
   * @param {Object} variables - Variables to replace in the translation
   * @param {String} locale - Locale to get the translation from
   * @returns {String} - The translation
   */
  get(options, variables) {
    const locale = options.locale || this.defaultLocale;
    let path = options.path.split(".");
    let string = this.strings.get(locale)?.get(path[0]);
    if (!string) {
      if (locale !== this.defaultLocale && this.retryInDefaultLocale)
        return this.get(path.join("."), variables, this.defaultLocale);

      return this.returnEmptyString ? "" : path.join(".");
    }
    for (let i = 1; i < path.length; i++) {
      if (string[path[i]]) string = string[path[i]];
      else return this.returnEmptyString ? "" : path.join(".");
    }

    if (variables)
      for (let variable in variables) {
        string = string.replace(
          this.mustacheRegex(this.escapeRegExp(variable)),
          variables[variable]
        );
      }

    return string;
  }
  /**
   * Constructor
   * @param {{ directory: String, extension: String, returnEmptyString: Boolean, defaultLocale: String, retryInDefaultLocale: Boolean, mustache: String[] }} options - Options
   */
  constructor({
    directory,
    extension,
    returnEmptyString,
    defaultLocale,
    retryInDefaultLocale,
    mustache,
  }) {
    this.directory = directory;
    this.returnEmptyString = returnEmptyString;
    this.defaultLocale = defaultLocale;
    this.retryInDefaultLocale = retryInDefaultLocale;

    this.strings = loadFiles(directory, extension, {
      exclude: RegExp(`${directory}/source`),
    });
    this.locales = this.strings.map((v, k) => k);

    this.mustache = mustache;
  }
}

module.exports = new I18n(i18n);
