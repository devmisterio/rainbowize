const readline = require("readline");
const argv = require("minimist")(process.argv.slice(2));
const { rainbowizeInput } = require("../lib/utils/input");

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
