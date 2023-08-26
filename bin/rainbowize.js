#!/usr/bin/env node

const readline = require("readline");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { rainbowizeInput } = require("../lib/utils/input");
const { ConfigManager } = require("../lib/class/ConfigManager");

async function main() {
	const stdin = process.stdin;

	const argv = yargs(hideBin(process.argv))
		.option("help", {
			alias: "h",
			describe: "Show usage information",
		})
		.option("scheme", {
			alias: "s",
			describe: "Color scheme for rainbowizing",
		})
		.option("bold", {
			alias: "b",
			describe: "Apply bold text effect",
			boolean: true,
		})
		.option("italic", {
			alias: "i",
			describe: "Apply italic text effect",
			boolean: true,
		}).argv;

	const configManager = new ConfigManager();
	const config = configManager.loadConfig();

	const defaultScheme = config.customScheme || false;
	const defaultBold = config.defaultBold || false;
	const defaultItalic = config.defaultItalic || false;

	if (argv.help) {
		console.log("Usage: <cmd> | rainbowize");
		console.log("--help: Show usage information");
		return;
	}

	if (stdin.isTTY) {
		console.log("The command is intended to work with pipes.");
		console.log("Usage: <cmd> | rainbowize");
		return;
	}

	const reader = readline.createInterface({
		input: stdin,
	});

	const scheme = argv.scheme || defaultScheme;
	const bold = argv.bold || defaultBold;
	const italic = argv.italic || defaultItalic;

	await rainbowizeInput(reader, scheme, bold, italic);
}

main().catch((error) => {
	console.error("An unhandled error occurred:", error);
});
