const fs = require("fs");
const path = require("path");

/**
 * A utility class responsible for managing configuration.
 * @class
 */
class ConfigManager {
	/**
	 * Load configuration from the config file.
	 * If the config file is missing or invalid, default options are used.
	 * @returns {object} The loaded configuration object.
	 * @function
	 */
	loadConfig() {
		try {
			// Read the content of the config file
			const configFile = fs.readFileSync(
				path.join(__dirname, "../../bin/config.json"),
				{
					encoding: "utf-8",
					flag: "r",
				},
			);
			// Parse the content as JSON to obtain the configuration object
			const config = JSON.parse(configFile);

			// Validate the fields in the config object
			if (!this.isValidConfig(config)) {
				console.warn("Invalid configuration. Using default options.");
				return {};
			}

			return config;
		} catch (error) {
			console.warn(
				"Configuration file not found or invalid. Using default options.",
			);
			return {}; // Return default configuration or an empty object
		}
	}

	/**
	 * Validate the fields and their types in the config object.
	 * @param {object} config - The configuration object to validate.
	 * @returns {boolean} Whether the configuration is valid.
	 * @function
	 */
	isValidConfig(config) {
		// Define the expected fields and their types
		const expectedFields = {
			customScheme: ["string", "boolean"],
			defaultBold: "boolean",
			defaultItalic: "boolean",
		};

		for (const field in expectedFields) {
			if (!config.hasOwnProperty(field)) {
				console.error(`Missing field '${field}' in config.`);
				return false;
			}

			const expectedTypes = expectedFields[field];
			const actualType = typeof config[field];

			if (!expectedTypes.includes(actualType)) {
				const expectedTypeList = expectedTypes.join(" or ");
				console.error(
					`Invalid type for field '${field}'. Expected ${expectedTypeList}.`,
				);
				return false;
			}
		}

		return true;
	}
}

module.exports = { ConfigManager };
