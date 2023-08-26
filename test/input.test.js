const { describe, it } = require("mocha");
const { assert } = require("chai");
const sinon = require("sinon");
const { rainbowizeInput } = require("../lib/utils/input");

/**
 * Mock readline interface for testing.
 */
class MockReader {
	/**
	 * Create a new MockReader instance.
	 * @param {string[]} inputs - An array of input strings.
	 */
	constructor(inputs) {
		this.inputs = inputs;
		this[Symbol.asyncIterator] = this.iterate.bind(this);
	}

	/**
	 * Async iterator for iterating through mock inputs.
	 */
	async *iterate() {
		for (const input of this.inputs) {
			yield input;
		}
	}
}

describe("rainbowizeInput", function () {
	it("should rainbowize input with colors and effects", async function () {
		// Create a mock reader with input strings.
		const mockReader = new MockReader(["Hello", "World", "Test"]);

		// Define test parameters.
		const scheme = "angura";
		const bold = true;
		const italic = false;

		// Spy on the console.log function.
		const consoleLogSpy = sinon.spy(console, "log");

		// Call the rainbowizeInput function with mock reader and test parameters.
		await rainbowizeInput(mockReader, scheme, bold, italic);

		// Assert that console.log was called the expected number of times.
		assert.equal(consoleLogSpy.callCount, 3);

		// Restore the original console.log function.
		consoleLogSpy.restore();
	});
});
