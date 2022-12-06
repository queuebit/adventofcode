const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const packetDecode: (arg0: string, arg1: number) => number = (
  datastream: string,
  decodeN: number
) => {
  for (let c = decodeN; c < datastream.length; c++) {
    let window = new Set(datastream.slice(c - decodeN, c));
    if (window.size === decodeN) {
      return c;
    }
  }
  return 0;
};
rl.on("line", (line: string) => {
  console.log({
    packetStart: packetDecode(line, 4),
    messageStart: packetDecode(line, 14),
  });
});

rl.once("close", () => {});
