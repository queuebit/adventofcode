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
            this.caveMap.add(n);
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
            this.caveMap.add(n);
          }
        }
      }
      from = [px, py];
    });
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
    console.log("tktk - isBottom");
    const [x, y] = this.stringToCoord(id);
    return (
      Array.from(this.caveMap).filter((c) => {
        const [cx, cy] = this.stringToCoord(c);
        return x === cx && y < cy;
      }).length > 0
    );
  }

  fallLeft(id: string) {
    console.log("tktk - fallsLeft");
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
    console.log("tktk - fallsRight");
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
    console.log("tktk - fallsDown");
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
    console.log(id);
    if (this.sand > 2000) {
      return this.sand;
    }
    if (!this.isBottom(id)) {
      return this.sand;
    } else if (this.caveMap.has(id)) {
      return this.sand;
    } else {
      const t = Date.now();
      const sits = this.fallsDown(id);
      console.log(`tmtm - falldown - ${Date.now() - t}`);
      const t2 = Date.now();
      const fl = this.fallLeft(sits);
      console.log(`tmtm - fallleft - ${Date.now() - t2}`);
      if (!fl) {
        const t3 = Date.now();
        const fr = this.fallRight(sits);
        console.log(`tmtm - fallright - ${Date.now() - t3}`);
        if (!fr) {
          this.cavern[sits] = "o";
          this.caveMap.add(sits);
          this.sand++;
        }
      }
      return this.sand;
    }
  }

  maxRockDepth() {
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
}
const part1 = () => {
  const c = new Cave(lines);
  console.log(c.fill());
  c.showCavern();
};
const part2 = () => {
  const c = new Cave(lines);
  const maxDepth = c.maxRockDepth();
  c.addRockWall([
    [300, maxDepth + 2],
    [800, maxDepth + 2],
  ]);
  console.log(c.fill());
  c.showCavern();
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
