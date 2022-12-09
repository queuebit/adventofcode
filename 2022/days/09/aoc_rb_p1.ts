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
};
let start = [0, 0];
let startKey = `0-0`;
let [hx, hy] = start;
let [tx, ty] = start;
let headVisited = new Set([startKey]);
let tailVisited = new Set([startKey]);

const nearBy = (
  head: [hx: number, hy: number],
  tail: [tx: number, ty: number]
) => {
  const [hx, hy] = head;
  const [tx, ty] = tail;
  return Math.hypot(hy - ty, hx - tx) < 2;
};
const makeMoves = (instructions: [move: string, count: number][]) => {
  instructions.forEach(([move, count]) => {
    let [dx, dy] = MOVES[move];
    for (let i = 0; i < count; i++) {
      hx += dx;
      hy += dy;
      headVisited.add(`${hx}-${hy}`);

      if (!nearBy([hx, hy], [tx, ty])) {
        const sepx = hx - tx;
        const sepy = hy - ty;
        const [tmx, tmy] = FOLLOW_MOVE[`${sepx}${sepy}`];
        tx += tmx;
        ty += tmy;
        tailVisited.add(`${tx}-${ty}`);
      }
    }
  });
};
rl.once("close", () => {
  makeMoves(instructions);
  console.log(tailVisited);
  console.log(tailVisited.size);
});
