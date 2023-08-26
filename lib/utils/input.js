const readline = require("readline");
const { calculateColor } = require("./color");

/**
 * Apply text effects to the input.
 * @param {string} input - The input text.
 * @param {boolean} bold - Whether to apply bold effect.
 * @param {boolean} underline - Whether to apply underline effect.
 * @param {boolean} italic - Whether to apply italic effect.
 * @returns {string} The formatted text.
 */
function applyTextEffects(input, bold, italic) {
	let formattedText = input;
	if (bold) {
		formattedText = `\x1b[1m${formattedText}\x1b[0m`;
	}
	if (italic) {
		formattedText = `\x1b[3m${formattedText}\x1b[0m`;
	}
	return formattedText;
}

/**
 * Rainbowize the input from stdin and print it to stdout with colors and effects.
 * @param {readline.Interface} reader - The readline interface for reading input.
 * @param {string} scheme - The name of the color scheme.
 * @param {boolean} bold - Whether to apply bold effect.
 * @param {boolean} underline - Whether to apply underline effect.
 * @param {boolean} italic - Whether to apply italic effect.
 */
async function rainbowizeInput(reader, scheme, bold, italic) {
	let index = 0;
	for await (const input of reader) {
		if (!input) {
			console.error("Error: Empty input received.");
			continue;
		}

		const [r, g, b] = calculateColor(index, scheme);
		const formattedInput = applyTextEffects(input, bold, italic);

		try {
			console.log(`\x1b[38;2;${r};${g};${b}m${formattedInput}\x1b[0m`);
		} catch (error) {
			console.error("Error during output:", error.message);
		}

		index++;
	}
}

module.exports = {
	rainbowizeInput,
};
