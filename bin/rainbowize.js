const readline = require('readline');
const argv = require('minimist')(process.argv.slice(2));


/**
 * Calculate RGB values based on an index.
 * @param {number} i - The index used for calculations.
 * @returns {number[]} An array of RGB values.
 */
function rgb(i) {
    const f = 0.1;

    return [
        Math.floor(Math.sin(f * i + 0) * 127 + 128),
        Math.floor(Math.sin(f * i + (2 * Math.PI) / 3) * 127 + 128),
        Math.floor(Math.sin(f * i + (4 * Math.PI) / 3) * 127 + 128)
    ];
}

/**
 * Rainbowize the input from stdin and print it to stdout.
 */
async function main() {
    const stdin = process.stdin;

    // Check if the user wants to see the help message.
    if (argv.h || argv.help) {
        console.log("Usage: <cmd> | rainbowize");
        console.log("--help: Show usage information");
        return;
    }

    // Check if input is coming from a TTY (terminal) or not (piped).
    if (stdin.isTTY) {
        console.log("The command is intended to work with pipes.");
        console.log("Usage: <cmd> | rainbowize");
        return;
    }

    // Create a readline interface to read from stdin.
    const reader = readline.createInterface({
        input: stdin
    });

    // Read each line from stdin and print it to stdout with a different color.
    let j = 0;
    for await (const input of reader) {
        if (!input) {
            console.error("Error: Empty input received.");
            continue;
        }

        // Calculate RGB values based on the line number.
        const [r, g, b] = rgb(j);

        // Print the line to stdout with the calculated color.
        try {
            console.log(`\x1b[38;2;${r};${g};${b}m${input}\x1b[0m`);
        } catch (error) {
            // Handle errors during console output
            console.error("Error during output:", error.message);
        }

        j++;
    }
}

main().catch(error => {
    console.error("An unhandled error occurred:", error);
});