const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line: string) => {});

rl.once("close", () => {});

const part1 = () => {};
const part2 = () => {};

part1();
part2();
