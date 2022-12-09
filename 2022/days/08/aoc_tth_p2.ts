const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let treeRows: number[][] = [];
const loadRows = (line: string) => {
  treeRows.push(line.split("").map(Number));
};

const zip = (arr: number[][]) => {
  return arr.map((_, i) => {
    return arr.map((row) => {
      return row[i];
    });
  });
};

const DIRECTION = {
  left: -1,
  up: -1,
  right: 1,
  down: 1,
};
const treesInView = (
  treeHeight: number,
  treeLine: number[],
  direction: number
) => {
  if (treeLine.length === 0) {
    return 0;
  }
  let trees = 0;
  if (direction === DIRECTION.left || direction === DIRECTION.up) {
    for (let t = treeLine.length - 1; t >= 0; t--) {
      if (treeLine[t] >= treeHeight) {
        return trees + 1;
      }
      trees += 1;
    }
  } else {
    for (let t = 0; t < treeLine.length; t++) {
      if (treeLine[t] >= treeHeight) {
        return trees + 1;
      }
      trees += 1;
    }
  }
  return trees;
};

rl.on("line", (line: string) => {
  loadRows(line);
});

rl.once("close", () => {
  // console.log(treeRows);
  const treeCols = zip(treeRows);
  // console.log(treeCols);

  const rs = treeRows.length;
  const cs = treeCols.length;
  let inViewMap: number[][] = [];
  let inViewLookup: { [key: string]: number } = {};
  for (let c = 0; c < cs; c++) {
    inViewMap.push([]);
    for (let r = 0; r < rs; r++) {
      const key = `${c}-${r}`;
      if (r === 0 || c === 0 || r === rs - 1 || c === cs - 1) {
        inViewMap[c].push(0);
        inViewLookup[key] = 0;
      } else {
        const treeHeight = treeRows[c][r];

        const leftVals = treeRows[c].slice(0, r);
        const leftInView = treesInView(treeHeight, leftVals, DIRECTION.left);
        // console.log({ key, treeHeight, leftVals, leftInView });

        const rightVals = treeRows[c].slice(r + 1);
        const rightInView = treesInView(treeHeight, rightVals, DIRECTION.right);
        // console.log({ key, treeHeight, rightVals, rightInView });

        const upVals = treeCols[r].slice(0, c);
        const upInView = treesInView(treeHeight, upVals, DIRECTION.up);
        // console.log({ key, treeHeight, upVals, upInView });

        const downVals = treeCols[r].slice(c + 1);
        const downInView = treesInView(treeHeight, downVals, DIRECTION.down);
        // console.log({ key, treeHeight, downVals, downInView });

        inViewMap[c].push(leftInView * rightInView * upInView * downInView);
        inViewLookup[key] = leftInView * rightInView * upInView * downInView;
      }
    }
  }
  // console.log(inViewMap);
  // console.log({ rs, cs });
  // console.log(Object.keys(inViewLookup).length);
  console.log(Math.max(...Object.values(inViewLookup)));
  /* That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
  or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 1613.) [Return to Day 8] */
  /* That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
  or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 1611.) [Return to Day 8] */
});
