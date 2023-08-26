const { calculateColor } = require("./color");

/**
 * Apply text effects to the input.
 * @param {string} input - The input text.
 * @param {boolean} bold - Whether to apply bold effect.
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
 * @param {Interface} reader - The readline interface for reading input.
 * @param {string} scheme - The name of the color scheme.
 * @param {boolean} bold - Whether to apply bold effect.
 * @param {boolean} italic - Whether to apply italic effect.
 * @param {number} batchSize - The size of the batch for processing.
 */
async function rainbowizeInput(reader, scheme, bold, italic, batchSize = 10) {
	// Initialize variables to keep track of index and the batch
	let index = 0;
	let batch = [];

	// Iterate through the input lines
	for await (const input of reader) {
		if (!input) {
			console.error("Error: Empty input received.");
			continue;
		}

		// Calculate color and apply text effects
		const [r, g, b] = calculateColor(index, scheme);
		const formattedInput = applyTextEffects(input, bold, italic);

		// Add formatted line to the batch
		batch.push(`\x1b[38;2;${r};${g};${b}m${formattedInput}\x1b[0m`);
		index++;

		// Check if the batch size is reached
		if (batch.length >= batchSize) {
			// Print the batch as a single output
			console.log(batch.join("\n"));
			// Clear the batch
			batch = [];
		}
	}

	// Process any remaining lines in the last batch
	if (batch.length > 0) {
		console.log(batch.join("\n"));
	}
}

module.exports = {
	rainbowizeInput,
};
