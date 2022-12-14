const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

class Cave {
  cavern: { [key: string]: string } = {};
  sand: number = 0;
  constructor(rockWalls: Coord[][]) {
    for (const rockWall of rockWalls) {
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
            }
          }
        }
        from = [px, py];
      });
    }
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
      Object.keys(this.cavern).filter((c) => {
        const [cx, cy] = this.stringToCoord(c);
        return x === cx && y < cy;
      }).length > 0
    );
  }

  fallLeft(id: string) {
    const [x, y] = this.stringToCoord(id);
    const left = this.coordToString([x - 1, y + 1]);
    if (left in this.cavern) {
      return false;
    } else {
      this.gravity(left);
      return true;
    }
  }
  fallRight(id: string) {
    const [x, y] = this.stringToCoord(id);
    const right = this.coordToString([x + 1, y + 1]);
    if (right in this.cavern) {
      return false;
    } else {
      this.gravity(right);
      return true;
    }
  }

  fallsDown(id: string) {
    const [x, y] = this.stringToCoord(id);
    return this.oneUp(
      Object.keys(this.cavern)
        .filter((c) => {
          const [cx, cy] = this.stringToCoord(c);
          return x === cx && y < cy;
        })
        .sort()[0]
    );
  }

  gravity(id: string) {
    if (!this.isBottom(id)) {
      return this.sand;
    } else {
      const sits = this.fallsDown(id);
      if (!this.fallLeft(sits)) {
        if (!this.fallRight(sits)) {
          this.cavern[sits] = "o";
          this.sand++;
        }
      }
      return this.sand;
    }
  }

  showCavern() {
    for (let y = 0; y < 150; y++) {
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
const part1 = () => {};
const part2 = () => {};

type Coord = [x: number, y: number];
let lines: Coord[][] = [];
rl.on("line", (line: string) => {
  const points: Coord[] = line
    .split(" -> ")
    .map((p) => p.split(",").map(Number) as Coord);
  lines.push(points);
});

rl.once("close", () => {
  const c = new Cave(lines);
  console.log(c.fill());
  c.showCavern();
  /*
  That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data;
  there are also some general tips on the about page,
  or you can ask for hints on the subreddit.
  Please wait one minute before trying again. (You guessed 540.) [Return to Day 14]
  */
  part1();
  part2();
});
