#!/usr/bin/env node

const { ConfigManager } = require("../lib/class/ConfigManager");
const { CommandProcessor } = require("../lib/class/CommandProcessor");
const { Application } = require("../lib/rainbowize");

/**
 * Entry point of the rainbowize application.
 * This script sets up and runs the rainbowize application using the Application class.
 */

/**
 * Main function that starts the rainbowize application.
 * @async
 * @function main
 */
async function main() {
	// Create instances of CommandProcessor and ConfigManager classes
	const commandProcessor = new CommandProcessor();
	const configManager = new ConfigManager();

	// Create an instance of the Application class and pass the dependencies
	const app = new Application(commandProcessor, configManager);

	// Run the rainbowize application
	await app.run();
}

// Run the main function and catch any unhandled errors
main().catch((error) => {
	console.error("An unhandled error occurred:", error);
});
