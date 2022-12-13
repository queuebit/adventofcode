const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const ORDER: { [key: string]: number } = {
  right: 1,
  wrong: -1,
  continue: 0,
};
const compare: (a: number[] | number, b: number[] | number) => number = (
  a: number[] | number,
  b: number[] | number
) => {
  console.log(`  - Compare ${a} vs ${b}`);
  if (typeof a === "number" && typeof b === "number") {
    if (a < b) {
      console.log(` .   - ${a} < ${b} - RIGHT ORDER`);
      return ORDER.right;
    } else if (a === b) {
      return ORDER.continue;
    } else {
      console.log(` .   - ${a} > ${b} - WRONG ORDER`);
      return ORDER.wrong;
    }
  } else if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length === 0) {
      console.log(` .   - left is shorter - RIGHT ORDER`);
      return ORDER.right;
    } else if (b.length === 0) {
      console.log(` .   - right is shorter - WRONG ORDER`);
      return ORDER.wrong;
    }
    for (let ai = 0; ai < a.length; ai++) {
      const comp = compare(a[ai], b[ai]);
      if (b[ai] === undefined) {
        console.log(` .   - right is shorter - WRONG ORDER`);
        return ORDER.wrong;
      }
      switch (comp) {
        case ORDER.right:
          return ORDER.right;
        case ORDER.wrong:
          return ORDER.wrong;
        case ORDER.continue:
          break;
        default:
          break;
      }
    }
    if (a.length < b.length) {
      console.log(` .   - left is shorter - RIGHT ORDER`);
      return ORDER.right;
    }
  } else {
    if (Array.isArray(a) && !Array.isArray(b)) {
      return compare(a, [b]);
    } else if (!Array.isArray(a) && Array.isArray(b)) {
      return compare([a], b);
    } else {
      return ORDER.continue;
    }
  }
  return ORDER.continue;
};
const part1 = (list: number[][]) => {
  const rights: number[] = [];
  for (let i = 0; i < list.length; i = i + 2) {
    const a = list[i];
    const b = list[i + 1];
    console.log(`== Pair ${i / 2 + 1} ==`);
    console.log(`- Compare ${a} vs ${b}`);
    const comp = compare(a, b);
    console.log(comp);

    switch (comp) {
      case ORDER.right:
        rights.push(i / 2 + 1);
        break;
      case ORDER.wrong:
        break;
      case ORDER.continue:
        break;
    }
    console.log();
  }
  console.log(rights.reduce((a, b) => a + b, 0));
  /* 
  That's not the right answer; your answer is too high.
  If you're stuck, make sure you're using the full input data;
  there are also some general tips on the about page,
  or you can ask for hints on the subreddit.
  Please wait one minute before trying again. (You guessed 6644.) [Return to Day 13]
  */
};
const part2 = () => {};

let list: number[][] = [];
rl.on("line", (line: string) => {
  if (line.length > 0) {
    list.push(eval(line.trim()));
  }
});

rl.once("close", () => {
  part1(list);
  part2();
});
