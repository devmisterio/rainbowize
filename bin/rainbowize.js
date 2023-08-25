#!/usr/bin/env node

const readline = require("readline");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { rainbowizeInput } = require("../lib/utils/input");

async function main() {
  const stdin = process.stdin;

  const argv = yargs(hideBin(process.argv))
    .option("help", {
      alias: "h",
      describe: "Show usage information",
    })
    .option("scheme", {
      alias: "s",
      describe: "Color scheme for rainbowizing",
    }).argv;

  if (argv.help) {
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

  const scheme = argv.scheme;

  await rainbowizeInput(reader, scheme);
}

main().catch((error) => {
  console.error("An unhandled error occurred:", error);
});
