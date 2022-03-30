const { Collection } = require("discord.js");

class Cooldown {
  /**
   * Check if 'key' is on cooldown
   * @param {String} key - The key to check
   * @returns {Boolean} - is on cooldown
   */
  has(key) {
    if (this.timestamps.has(key)) {
      if (this.timestamps.get(key) > Date.now()) return true;
      this.timestamps.delete(key);
      return false;
    }
    return false;
  }
  /**
   * Set cooldown for 'key'
   * @param {String} key - The key to set
   * @param {Number} amount - The cooldown in seconds
   */
  set(key, amount) {
    this.timestamps.set(key, Date.now() + amount * 1000);
  }
  /**
   * Get time left for 'key' in seconds
   * @param {String} key - The key to get time left for
   * @returns {Number} - Time left in seconds
   */
  timeLeft(key) {
    if (this.has(key)) {
      return (this.timestamps.get(key) - Date.now()) / 1000;
    }
    return 0;
  }
  /**
   * @param {Collection<String, Number>} timestamps
   */
  constructor(timestamps = new Collection()) {
    /**
     * End time of cooldowns
     * @type {Collection<String, Number>}
     */
    this.timestamps = timestamps;
  }
}

module.exports = new Cooldown();
