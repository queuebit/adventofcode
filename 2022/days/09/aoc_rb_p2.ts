const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let instructions: [move: string, count: number][] = [];
rl.on("line", (line: string) => {
  const [move, count] = line.split(" ");
  instructions.push([move, Number(count)]);
});

const MOVES: { [key: string]: [nx: number, ny: number] } = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
};
const FOLLOW_MOVE: { [key: string]: [nx: number, ny: number] } = {
  "02": [0, 1],
  "20": [1, 0],
  "0-2": [0, -1],
  "-20": [-1, 0],
  "21": [1, 1],
  "12": [1, 1],
  "1-2": [1, -1],
  "2-1": [1, -1],
  "-21": [-1, 1],
  "-12": [-1, 1],
  "-1-2": [-1, -1],
  "-2-1": [-1, -1],
  "22": [1, 1],
  "2-2": [1, -1],
  "-2-2": [-1, -1],
  "-22": [-1, 1],
};
type Coord = [kx: number, ky: number];
let start: Coord = [0, 0];
let startKey = `0-0`;
let [hx, hy] = start;
const nKnots = 9;
let knots: Coord[] = [];
for (let k = 0; k < nKnots; k++) {
  knots.push(start);
}

let [tx, ty] = start;
let headVisited = new Set([startKey]);
let tailVisited = new Set([startKey]);

const nearBy = (
  lead: [lx: number, ly: number],
  follow: [fx: number, fy: number]
) => {
  const [lx, ly] = lead;
  const [fx, fy] = follow;
  return Math.hypot(ly - fy, lx - fx) < 2;
};
const makeMoves = (instructions: [move: string, count: number][]) => {
  instructions.forEach(([move, count]) => {
    let [dx, dy] = MOVES[move];
    for (let i = 0; i < count; i++) {
      hx += dx;
      hy += dy;
      headVisited.add(`${hx}-${hy}`);

      let lead: Coord = [hx, hy];
      let newKnots: Coord[] = [];
      knots.forEach((knot, i) => {
        let [kx, ky] = knot;
        if (!nearBy(lead, knot)) {
          const [lx, ly] = lead;
          const sepx = lx - kx;
          const sepy = ly - ky;
          const sep = `${sepx}${sepy}`;
          const [kmx, kmy] = FOLLOW_MOVE[sep];
          kx += kmx;
          ky += kmy;
          if (i === nKnots - 1) {
            tailVisited.add(`${kx}-${ky}`);
          }
        }
        const newKnot: Coord = [kx, ky];
        newKnots.push(newKnot);
        lead = newKnot;
      });
      knots = newKnots;
    }
  });
};
rl.once("close", () => {
  makeMoves(instructions);
  // console.log(tailVisited);
  console.log(tailVisited.size);
});
