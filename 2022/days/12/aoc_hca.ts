const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

type Coord = [x: number, y: number];

class HeightMap {
  map: string[][];
  start: Coord;
  end: Coord;

  constructor() {
    this.map = [];
    this.start = [0, 0];
    this.end = [0, 0];
  }

  addRow(row: string[]) {
    this.map.push(row);
    const currentRow = this.map.length - 1;
    if (row.includes("S")) {
      this.start = [currentRow, row.indexOf("S")];
    } else if (row.includes("E")) {
      this.end = [currentRow, row.indexOf("E")];
    }
  }

  showMap() {
    for (let r = 0; r < this.map.length; r++) {
      console.log(this.map[r].join("|"));
    }
  }
}

const part1 = () => {
  hm.showMap();
};
const part2 = () => {};

let hm = new HeightMap();
rl.on("line", (line: string) => {
  hm.addRow(Array.from(line));
});

rl.once("close", () => {
  part1();
  part2();
});
