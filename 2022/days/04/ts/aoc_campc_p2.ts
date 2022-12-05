const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const range = (elfRange: string) => {
  const [start, end] = elfRange.split("-").map(Number);
  let r = new Set<number>();
  for (let i = start; i <= end; i++) {
    r.add(i);
  }
  return r;
};
const partiallyContained = (a: Set<number>, b: Set<number>) => {
  let intersection = new Set(Array.from(a).filter((x) => b.has(x)));
  return intersection.size > 0;
};
const fullyContained = (a: Set<number>, b: Set<number>) => {
  let intersection = new Set(Array.from(a).filter((x) => b.has(x)));
  return intersection.size === a.size;
};
let partiallyContainedPairs = 0;
rl.on("line", (line: string) => {
  const [elfA, elfB] = line.split(",").map(range);
  if (partiallyContained(elfA, elfB) || partiallyContained(elfB, elfA)) {
    // console.log({ elfA, elfB, sA: elfA.size, sB: elfB.size });
    partiallyContainedPairs += 1;
  }
});

rl.once("close", () => {
  console.log(partiallyContainedPairs);
  // end of input
});
