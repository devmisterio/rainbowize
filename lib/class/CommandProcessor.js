const readline = require("readline");
const { getSchemeNames } = require("../customColorSchemes");

class CommandProcessor {
	handleTTYCheck() {
		const stdin = process.stdin;
		if (stdin.isTTY) {
			console.log("The command is intended to work with pipes.");
			console.log("Usage: <cmd> | rainbowize");
			process.exit(1); // Exit with a non-zero status code to indicate an issue
		}
	}
	parseArguments() {
		const yargs = require("yargs/yargs");
		const { hideBin } = require("yargs/helpers");

		return yargs(hideBin(process.argv)).options({
			help: {
				alias: "h",
				describe: "Show usage information",
			},
			scheme: {
				alias: "s",
				describe: "Color scheme for rainbowizing",
				choices: getSchemeNames(),
			},
			bold: {
				alias: "b",
				describe: "Apply bold text effect",
				boolean: true,
			},
			italic: {
				alias: "i",
				describe: "Apply italic text effect",
				boolean: true,
			},
		}).argv;
	}

	createInputReader() {
		const stdin = process.stdin;
		return readline.createInterface({
			input: stdin,
		});
	}
}

module.exports = { CommandProcessor };
