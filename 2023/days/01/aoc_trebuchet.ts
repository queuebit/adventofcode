import { parse } from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const part1 = () => {};
const part2 = () => {};

rl.on("line", (line: string) => {
  console.log(line);
});

rl.once("close", () => {
  part1();
  part2();
});
