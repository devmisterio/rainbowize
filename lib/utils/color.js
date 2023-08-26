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
 * @param {number} index - The index used for calculations.
 * @param {string|null} scheme - The name of the color scheme.
 * @returns {number[]} An array of RGB values.
 */
function calculateColor(index, scheme) {
	const { customColorSchemes } = require("./customColorSchemes");
	if (scheme) {
		const colors = customColorSchemes[scheme];
		return colors[index % colors.length];
	} else {
		return calculateRgb(index);
	}
}

module.exports = {
	calculateRgb,
	calculateColor,
};
