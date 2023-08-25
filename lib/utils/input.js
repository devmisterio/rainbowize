const readline = require("readline");
const { calculateColor } = require("./color");

/**
 * Rainbowize the input from stdin and print it to stdout with colors.
 * @param {readline.Interface} reader - The readline interface for reading input.
 * @param {string} scheme - The name of the color scheme.
 */
async function rainbowizeInput(reader, scheme) {
  const customColorSchemes = require("../customColorSchemes");

  let index = 0;
  for await (const input of reader) {
    if (!input) {
      console.error("Error: Empty input received.");
      continue;
    }

    const [r, g, b] = calculateColor(index, scheme, customColorSchemes);

    try {
      console.log(`\x1b[38;2;${r};${g};${b}m${input}\x1b[0m`);
    } catch (error) {
      console.error("Error during output:", error.message);
    }

    index++;
  }
}

module.exports = {
  rainbowizeInput,
};
