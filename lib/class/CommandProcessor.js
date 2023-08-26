const readline = require("readline");
const { getSchemeNames } = require("../utils/customColorSchemes");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

/**
 * A utility class responsible for handling command-line input processing.
 * @class
 */
class CommandProcessor {
	/**
	 * Checks if the input is coming from a TTY (terminal).
	 * If true, displays a message and exits the process.
	 * @function handleTTYCheck
	 */
	handleTTYCheck() {
		const stdin = process.stdin;
		if (stdin.isTTY) {
			console.log("The command is intended to work with pipes.");
			console.log("Usage: <cmd> | rainbowize");
			process.exit(1); // Exit with a non-zero status code to indicate an issue
		}
	}

	/**
	 * Parses command-line arguments using yargs and returns the parsed arguments.
	 * @returns {object} Parsed command-line arguments.
	 * @function parseArguments
	 */
	parseArguments() {
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

	/**
	 * Creates a readline interface for reading input.
	 * @returns {readline.Interface} A readline interface.
	 * @function createInputReader
	 */
	createInputReader() {
		const stdin = process.stdin;
		return readline.createInterface({
			input: stdin,
		});
	}
}

module.exports = { CommandProcessor };
