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
const fullyContained = (a: Set<number>, b: Set<number>) => {
  let intersection = new Set<number>(Array.from(a).filter((x) => b.has(x)));
  return intersection.size === a.size;
};
let fullyContainedPairs = 0;
rl.on("line", (line: string) => {
  const [elfA, elfB] = line.split(",").map(range);
  /* That's not the right answer; your answer is too high.
  If you're stuck, make sure you're using the full input data;
  there are also some general tips on the about page, or you can ask for hints on the subreddit.
  Please wait one minute before trying again. (You guessed 632.) [Return to Day 4] */
  /* That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data;
  there are also some general tips on the about page, or you can ask for hints on the subreddit.
  Please wait one minute before trying again. (You guessed 403.) [Return to Day 4] */
  if (fullyContained(elfA, elfB) || fullyContained(elfB, elfA)) {
    // console.log({ elfA, elfB, sA: elfA.size, sB: elfB.size });
    fullyContainedPairs += 1;
  }
});

rl.once("close", () => {
  console.log(fullyContainedPairs);
  // end of input
});
