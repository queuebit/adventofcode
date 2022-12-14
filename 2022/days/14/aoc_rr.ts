const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

class Cave {
  cavern: { [key: number]: string } = {};
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
              cTest = (y) => y < py;
              nextBy = 1;
            } else {
              cTest = (y) => y > py;
              nextBy = -1;
            }
            for (let y = fy; cTest(y); y += nextBy) {
              const n = this.coordToNumber([px, y]);
              this.cavern[n] = "#";
            }
          } else if (fy === py) {
            let cTest: (n: number) => boolean;
            let nextBy: number;
            if (fx < px) {
              cTest = (x) => x < px;
              nextBy = 1;
            } else {
              cTest = (x) => x > px;
              nextBy = -1;
            }
            for (let x = fx; cTest(x); x += nextBy) {
              const n = this.coordToNumber([x, py]);
              this.cavern[n] = "#";
            }
          }
        }
        from = [px, py];
      });
    }
  }

  coordToNumber(c: Coord) {
    const [cx, cy] = c;
    return cx * 1e6 + cy;
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
  console.log(lines);
  const c = new Cave(lines);
  console.log(c.cavern);
  part1();
  part2();
});
