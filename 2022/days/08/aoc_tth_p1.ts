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
  let inViewMap: { [key: string]: boolean } = {};
  for (let r = 0; r < rs; r++) {
    for (let c = 0; c < cs; c++) {
      const key = `${r}${c}`;
      if (r === 0 || c === 0 || r === rs - 1 || c === cs - 1) {
        inViewMap[key] = true;
      }
      const treeHeight = treeRows[c][r];
      const leftView = !(
        treeRows[c].slice(0, r).filter((t) => t >= treeHeight).length > 0
      );
      const rightView = !(
        treeRows[c].slice(r + 1).filter((t) => t >= treeHeight).length > 0
      );
      const upView = !(
        treeCols[r].slice(0, c).filter((t) => t >= treeHeight).length > 0
      );
      const downView = !(
        treeCols[r].slice(c + 1).filter((t) => t >= treeHeight).length > 0
      );
      inViewMap[key] = leftView || rightView || upView || downView;
    }
  }
  console.log(inViewMap);
  console.log(Object.values(inViewMap).filter((viewable) => viewable).length);
  /* That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
  or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 1613.) [Return to Day 8] */
});
