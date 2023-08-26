const chai = require("chai");
const assert = chai.assert;

// Import the functions to be tested
const { calculateColor, calculateRgb } = require("../lib/utils/color");

/**
 * A test suite for the Color Calculator.
 */
describe("Color Calculator", function () {
	/**
	 * Test suite for the calculateRgb function.
	 */
	describe("calculateRgb", function () {
		/**
		 * Test case for calculating RGB values based on an index.
		 */
		it("should calculate RGB values based on an index", function () {
			// Call the calculateRgb function with an index
			const result = calculateRgb(0);

			// Compare the result with the expected RGB values
			assert.deepEqual(result, [128, 237, 18]);
		});
	});

	/**
	 * Test suite for the calculateColor function.
	 */
	describe("calculateColor", function () {
		/**
		 * Test case for calculating color based on the index and scheme.
		 */
		it("should calculate color based on the index and scheme", function () {
			// Call the calculateColor function with custom scheme
			const resultWithCustomScheme = calculateColor(0, "angura");

			// Compare the result with the expected RGB values
			assert.deepEqual(resultWithCustomScheme, [253, 255, 245]);

			// Call the calculateColor function without scheme
			const resultWithoutScheme = calculateColor(1, null);
			// Compare the result with the expected RGB values
			assert.deepEqual(resultWithoutScheme, [140, 231, 12]);
		});
	});
});
