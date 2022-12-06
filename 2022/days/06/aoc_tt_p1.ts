const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const packetStart: (arg0: string) => number = (datastream: string) => {
  for (let c = 4; c < datastream.length; c++) {
    let window = new Set(datastream.slice(c - 4, c));
    if (window.size === 4) {
      return c;
    }
  }
  return 0;
};
rl.on("line", (line: string) => {
  console.log(packetStart(line));
});

rl.once("close", () => {});
