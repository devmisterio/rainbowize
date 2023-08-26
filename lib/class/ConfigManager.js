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
				},
			);
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
