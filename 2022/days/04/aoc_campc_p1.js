const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const range = (elfRange) => {
  [start, end] = elfRange.split("-").map(Number);
  let r = new Set();
  for (let i = start; i < end; i++) {
    r.add(i);
  }
  return r;
};
const fullyContained = (a, b) => {
  let intersection = new Set([...a].filter((x) => b.has(x)));
  return [...intersection].length === [...a].length;
};
let fullyContainedPairs = 0;
rl.on("line", (line) => {
  [elfA, elfB] = line.split(",").map(range);
  if (fullyContained(elfA, elfB) || fullyContained(elfB, elfA)) {
    fullyContainedPairs += 1;
  }
});

rl.once("close", () => {
  console.log(fullyContainedPairs);
  // end of input
});
