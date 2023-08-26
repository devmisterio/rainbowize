/**
 * Defines custom color schemes using RGB values.
 * Each color scheme is represented as an array of RGB color values.
 *
 * @typedef {Object} CustomColorSchemes
 * @property {number[][]} angura - Angura color scheme.
 * @property {number[][]} bohemia - Bohemia color scheme.
 * @property {number[][]} ruri - Ruri color scheme.
 */

/**
 * Custom color schemes (RGB values) available for rainbowizing.
 * @type {CustomColorSchemes}
 */
const customColorSchemes = {
	angura: [
		[253, 255, 245],
		[58, 64, 59],
		[205, 127, 50],
		[224, 60, 49],
		[133, 1, 1],
	],
	bohemia: [
		[25, 84, 58],
		[0, 48, 48],
		[180, 238, 180],
		[255, 127, 89],
		[255, 131, 0],
	],
	ruri: [
		[16, 80, 144],
		[242, 213, 104],
		[24, 112, 173],
		[250, 250, 250],
		[69, 74, 82],
	],
};

/**
 * Retrieve the names of available color schemes.
 *
 * @returns {string[]} An array of color scheme names.
 * @function
 */
function getSchemeNames() {
	return Object.keys(customColorSchemes);
}

module.exports = {
	customColorSchemes,
	getSchemeNames,
};
