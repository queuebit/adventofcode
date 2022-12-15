const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

class Cave {
  cavern: { [key: string]: string } = {};
  caveMap: Set<string> = new Set<string>();
  sand: number = 0;
  maxY: number = 0;

  constructor(rockWalls: Coord[][]) {
    for (const rockWall of rockWalls) {
      this.addRockWall(rockWall);
    }
  }

  addRockWall(rockWall: Coord[]) {
    let from: Coord;
    rockWall.forEach(([px, py], i) => {
      if (i === 0) {
        from = [px, py];
      } else {
        const [fx, fy] = from;
        if (fx === px) {
          let cTest: (n: number) => boolean;
          let nextBy: number;
          if (fy < py) {
            cTest = (y) => y <= py;
            nextBy = 1;
          } else {
            cTest = (y) => y >= py;
            nextBy = -1;
          }
          for (let y = fy; cTest(y); y += nextBy) {
            const n = this.coordToString([px, y]);
            this.cavern[n] = "#";
            this.caveMap.add(`${px}-${y}`);
          }
        } else if (fy === py) {
          let cTest: (n: number) => boolean;
          let nextBy: number;
          if (fx < px) {
            cTest = (x) => x <= px;
            nextBy = 1;
          } else {
            cTest = (x) => x >= px;
            nextBy = -1;
          }
          for (let x = fx; cTest(x); x += nextBy) {
            const n = this.coordToString([x, py]);
            this.cavern[n] = "#";
            this.caveMap.add(`${x}-${py}`);
          }
        }
      }
      from = [px, py];
    });
    this.maxY = this.findMaxRockDepth();
  }

  coordToString(c: Coord) {
    const PAD = 9;
    const [cx, cy] = c;
    return (cx * 1e6 + cy).toString().padStart(PAD, "0");
  }

  stringToCoord(id: string) {
    const x = Math.floor(Number(id) / 1e6);
    const y = Number(id) - x * 1e6;
    return [x, y];
  }

  oneUp(id: string) {
    const [x, y] = this.stringToCoord(id);
    return this.coordToString([x, y - 1]);
  }

  isBottom(id: string) {
    const [x, y] = this.stringToCoord(id);
    return (
      Array.from(this.caveMap).filter((c) => {
        const [cx, cy] = this.stringToCoord(c);
        return x === cx && y < cy;
      }).length > 0
    );
  }

  fallLeft(id: string) {
    const [x, y] = this.stringToCoord(id);
    const left = this.coordToString([x - 1, y + 1]);
    if (this.caveMap.has(left)) {
      return false;
    } else {
      this.gravity(left);
      return true;
    }
  }
  fallRight(id: string) {
    const [x, y] = this.stringToCoord(id);
    const right = this.coordToString([x + 1, y + 1]);
    if (this.caveMap.has(right)) {
      return false;
    } else {
      this.gravity(right);
      return true;
    }
  }

  fallsDown(id: string) {
    const [x, y] = this.stringToCoord(id);
    return this.oneUp(
      Array.from(this.caveMap)
        .filter((c) => {
          const [cx, cy] = this.stringToCoord(c);
          return x === cx && y < cy;
        })
        .sort()[0]
    );
  }

  gravity(id: string) {
    if (this.sand > 2000) {
      return this.sand;
    }
    if (!this.isBottom(id)) {
      return this.sand;
    } else if (this.caveMap.has(id)) {
      return this.sand;
    } else {
      const sits = this.fallsDown(id);
      if (!this.fallLeft(sits)) {
        if (!this.fallRight(sits)) {
          this.cavern[sits] = "o";
          this.caveMap.add(sits);
          this.sand++;
        }
      }
      return this.sand;
    }
  }

  findMaxRockDepth() {
    return Math.max(
      ...Object.keys(this.cavern)
        .filter((c) => {
          return this.cavern[c] === "#";
        })
        .map((c) => this.stringToCoord(c)[1])
    );
  }

  showCavern() {
    for (let y = 0; y < 200; y++) {
      let row: string[] = [];
      for (let x = 475; x < 575; x++) {
        const id = this.coordToString([x, y]);
        const v = this.cavern[id] || ".";
        row.push(v);
      }
      console.log(row.join(""));
    }
  }

  fill() {
    const fallsFrom = 500;
    let sandIn = this.sand;
    while (true) {
      const sandOut = this.gravity(this.coordToString([fallsFrom, 0]));
      if (sandOut === sandIn) return this.sand;
      else sandIn = sandOut;
    }
  }
  fill2() {
    const fallsFrom = 500;
    let endlessVoid = false;

    while (!endlessVoid) {
      let [px, py] = [fallsFrom, 0];

      while (true) {
        if (!this.caveMap.has(`${px}-${py + 1}`)) {
          py++;
        } else if (!this.caveMap.has(`${px - 1}-${py + 1}`)) {
          px--;
          py++;
        } else if (!this.caveMap.has(`${px + 1}-${py + 1}`)) {
          px++;
          py++;
        } else {
          this.caveMap.add(`${px}-${py}`);
          this.sand++;
          break;
        }
        if (py >= this.maxY) {
          endlessVoid = true;
          break;
        }
      }
    }
    return this.sand;
  }
  fill3() {
    while (true) {
      if (this.caveMap.has(`500-0`)) {
        break;
      }
      let [px, py] = [500, 0];

      while (true) {
        if (py === this.maxY - 1) {
          this.caveMap.add(`${px}-${py}`);
          this.sand++;
          break;
        } else if (!this.caveMap.has(`${px}-${py + 1}`)) {
          py++;
        } else if (!this.caveMap.has(`${px - 1}-${py + 1}`)) {
          px--;
          py++;
        } else if (!this.caveMap.has(`${px + 1}-${py + 1}`)) {
          px++;
          py++;
        } else {
          this.caveMap.add(`${px}-${py}`);
          this.sand++;
          break;
        }
      }
    }
    return this.sand;
  }
}
const part1 = () => {
  const c = new Cave(lines);
  console.log(c.fill2());
  // c.showCavern();
};
const part2 = () => {
  const c = new Cave(lines);
  c.addRockWall([
    [300, c.maxY + 2],
    [800, c.maxY + 2],
  ]);
  console.log(c.fill3());
  // c.showCavern();
  /* 
  That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data;
  there are also some general tips on the about page, 
  or you can ask for hints on the subreddit. 
  Please wait one minute before trying again. (You guessed 7438.) [Return to Day 14]
  node aoc_rr.js < puzzle1.in  1047.44s user 4.05s system 99% cpu 17:32.51 total
  https://github.com/LuisMayo/advent-of-code-2022/blob/master/src/day14/src/part1.ts
  */
};

type Coord = [x: number, y: number];
let lines: Coord[][] = [];
rl.on("line", (line: string) => {
  const points: Coord[] = line
    .split(" -> ")
    .map((p) => p.split(",").map(Number) as Coord);
  lines.push(points);
});
rl.once("close", () => {
  part1();
  part2();
});
