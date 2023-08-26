#!/usr/bin/env node

const { rainbowizeInput } = require("../lib/utils/input");
const { ConfigManager } = require("../lib/class/ConfigManager");
const { CommandProcessor } = require("../lib/class/CommandProcessor");

async function main() {
	const commandProcessor = new CommandProcessor();
	const configManager = new ConfigManager();

	commandProcessor.handleTTYCheck();
	const argv = commandProcessor.parseArguments();

	const config = configManager.loadConfig();

	const defaultScheme = config.customScheme || false;
	const defaultBold = config.defaultBold || false;
	const defaultItalic = config.defaultItalic || false;

	const reader = commandProcessor.createInputReader();

	const scheme = argv.scheme || defaultScheme;
	const bold = argv.bold || defaultBold;
	const italic = argv.italic || defaultItalic;

	await rainbowizeInput(reader, scheme, bold, italic);
}

main().catch((error) => {
	console.error("An unhandled error occurred:", error);
});
