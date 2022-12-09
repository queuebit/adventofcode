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
rl.on("line", (line: string) => {
  loadRows(line);
});

rl.once("close", () => {
  console.log(treeRows);
  const treeCols = zip(treeRows);
  console.log(treeCols);

  const rs = treeRows.length;
  const cs = treeCols.length;
  let inViewMap: boolean[][] = [];
  let inViewLookup: { [key: string]: boolean } = {};
  for (let c = 0; c < cs; c++) {
    inViewMap.push([]);
    for (let r = 0; r < rs; r++) {
      const key = `${c}-${r}`;
      if (r === 0 || c === 0 || r === rs - 1 || c === cs - 1) {
        inViewMap[c].push(true);
        inViewLookup[key] = true;
      } else {
        const treeHeight = treeRows[c][r];

        const leftVals = treeRows[c].slice(0, r);
        const leftView = leftVals.filter((t) => t >= treeHeight).length === 0;
        // console.log({ key, treeHeight, leftVals, leftView });

        const rightVals = treeRows[c].slice(r + 1);
        const rightView = rightVals.filter((t) => t >= treeHeight).length === 0;
        // console.log({ key, treeHeight, rightVals, rightView });

        const upVals = treeCols[r].slice(0, c);
        const upView = upVals.filter((t) => t >= treeHeight).length === 0;
        // console.log({ key, treeHeight, upVals, upView });

        const downVals = treeCols[r].slice(c + 1);
        const downView = downVals.filter((t) => t >= treeHeight).length === 0;
        // console.log({ key, treeHeight, downVals, downView });

        inViewMap[c].push(leftView || rightView || upView || downView);
        inViewLookup[key] = leftView || rightView || upView || downView;
      }
    }
  }
  console.log(inViewMap);
  console.log({ rs, cs });
  console.log(Object.keys(inViewLookup).length);
  console.log(
    Object.values(inViewLookup).filter((viewable) => viewable).length
  );
  /* That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
  or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 1613.) [Return to Day 8] */
  /* That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
  or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 1611.) [Return to Day 8] */
});
