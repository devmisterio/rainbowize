const { calculateColor } = require("./color");

// A cache to store previously formatted outputs
const colorizedOutputCache = new Map();

/**
 * Apply text effects to the input.
 * @param {string} input - The input text.
 * @param {boolean} bold - Whether to apply bold effect.
 * @param {boolean} italic - Whether to apply italic effect.
 * @returns {string} The formatted text.
 */
function applyTextEffects(input, bold, italic) {
	// Initialize the formatted text with the input
	let formattedText = input;

	// Apply bold effect if specified
	if (bold) {
		formattedText = `\x1b[1m${formattedText}\x1b[0m`;
	}

	// Apply italic effect if specified
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
		// Skip empty inputs
		if (!input) {
			console.error("Error: Empty input received.");
			continue;
		}

		// Generate a cache key based on input parameters
		const cacheKey = `${scheme}-${bold}-${italic}-${input}`;
		let formattedInput = colorizedOutputCache.get(cacheKey);

		// If the output is not cached, calculate and format it
		if (!formattedInput) {
			const [r, g, b] = calculateColor(index, scheme);
			formattedInput = applyTextEffects(input, bold, italic);
			formattedInput = `\x1b[38;2;${r};${g};${b}m${formattedInput}\x1b[0m`;

			// Cache the formatted output
			colorizedOutputCache.set(cacheKey, formattedInput);
		}

		batch.push(formattedInput);
		index++;

		// If the batch size is reached, print the batch
		if (batch.length >= batchSize) {
			console.log(batch.join("\n"));
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
