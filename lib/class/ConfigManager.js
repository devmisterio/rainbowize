const fs = require("fs");
const path = require("path");

class ConfigManager {
  loadConfig() {
    try {
      const configFile = fs.readFileSync(
        path.join(__dirname, "../../bin/config.json"),
        {
          encoding: "utf-8",
          flag: "r",
        }
      );
      return JSON.parse(configFile);
    } catch (error) {
      console.warn(
        "Configuration file not found or invalid. Using default options."
      );
      return {}; // Return default configuration or an empty object
    }
  }
}

module.exports = {ConfigManager};
