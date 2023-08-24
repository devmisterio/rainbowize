const readline = require("readline");
const argv = require("minimist")(process.argv.slice(2));

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
};

/**
 * Calculate RGB values based on an index.
 * @param {number} index - The index used for calculations.
 * @returns {number[]} An array of RGB values.
 */
function calculateRgb(index) {
  const frequency = 0.1;

  return [
    Math.floor(Math.sin(frequency * index + 0) * 127 + 128),
    Math.floor(Math.sin(frequency * index + (2 * Math.PI) / 3) * 127 + 128),
    Math.floor(Math.sin(frequency * index + (4 * Math.PI) / 3) * 127 + 128),
  ];
}

/**
 * Calculate color based on the index and scheme.
 * @param {number} index - The index used for calculations.
 * @param {string} scheme - The name of the color scheme.
 * @returns {number[]} An array of RGB values.
 */
function calculateColor(index, scheme) {
  if (scheme) {
    const colors = customColorSchemes[scheme];
    return colors[index % colors.length];
  } else {
    return calculateRgb(index);
  }
}

/**
 * Rainbowize the input from stdin and print it to stdout with colors.
 * @param {readline.Interface} reader - The readline interface for reading input.
 * @param {string} scheme - The name of the color scheme.
 */
async function rainbowizeInput(reader, scheme) {
  let index = 0;
  for await (const input of reader) {
    if (!input) {
      console.error("Error: Empty input received.");
      continue;
    }

    const [r, g, b] = calculateColor(index, scheme);

    try {
      console.log(`\x1b[38;2;${r};${g};${b}m${input}\x1b[0m`);
    } catch (error) {
      console.error("Error during output:", error.message);
    }

    index++;
  }
}

/**
 * Rainbowize the input from stdin based on the chosen color scheme.
 * @async
 */
async function main() {
  const stdin = process.stdin;

  if (argv.h || argv.help) {
    console.log("Usage: <cmd> | rainbowize");
    console.log("--help: Show usage information");
    return;
  }

  if (stdin.isTTY) {
    console.log("The command is intended to work with pipes.");
    console.log("Usage: <cmd> | rainbowize");
    return;
  }

  const reader = readline.createInterface({
    input: stdin,
  });

  const scheme = argv.s || argv.scheme;

  await rainbowizeInput(reader, scheme);
}

main().catch((error) => {
  console.error("An unhandled error occurred:", error);
});
