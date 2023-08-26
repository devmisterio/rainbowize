// Define custom color schemes (RGB values)
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

function getSchemeNames() {
	return Object.keys(customColorSchemes);
}

module.exports = {
	customColorSchemes,
	getSchemeNames,
};
