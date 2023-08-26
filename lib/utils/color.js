/**
 * Calculate RGB values based on an index.
 * @param {number} index - The index used for calculations.
 * @returns {number[]} An array of RGB values.
 */
function calculateRgb(index) {
	const frequency = 0.1;

	return [
		Math.floor(Math.sin(frequency * index) * 127 + 128),
		Math.floor(Math.sin(frequency * index + (2 * Math.PI) / 3) * 127 + 128),
		Math.floor(Math.sin(frequency * index + (4 * Math.PI) / 3) * 127 + 128),
	];
}

/**
 * Calculate color based on the index and scheme.
 * If a scheme is provided, it uses predefined colors; otherwise, it calculates RGB values.
 *
 * @param {number} index - The index used for calculations.
 * @param {string|null} scheme - The name of the color scheme.
 * @returns {number[]} An array of RGB values.
 */
function calculateColor(index, scheme) {
	// Load custom color schemes
	const { customColorSchemes } = require("./customColorSchemes");

	if (scheme) {
		// Use predefined colors from the specified scheme
		const colors = customColorSchemes[scheme];
		return colors[index % colors.length];
	} else {
		// Calculate RGB values based on the index
		return calculateRgb(index);
	}
}

module.exports = {
	calculateRgb,
	calculateColor,
};
