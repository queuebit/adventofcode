const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

class HeightMap {
  map: string[][];
  start: string;
  end: string;

  constructor() {
    this.map = [];
    this.start = "0-0";
    this.end = "0-0";
  }

  addRow(row: string[]) {
    this.map.push(row);
    const currentRow = this.map.length - 1;
    if (row.includes("S")) {
      this.start = `${currentRow}-${row.indexOf("S")}`;
    } else if (row.includes("E")) {
      this.end = `${currentRow}-${row.indexOf("E")}`;
    }
  }

  showMap() {
    for (let r = 0; r < this.map.length; r++) {
      console.log(this.map[r].join("|"));
    }
  }

  dijkstra(source: string = this.start) {
    let q: [key: string, dist: number][] = [];
    let dist: { [key: string]: number } = {};
    let prev: { [key: string]: string } = {};
    const NNN = 999;

    const height = this.map.length;
    const width = this.map[0].length;
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const v = `${r}-${c}`;
        dist[v] = NNN;
        prev[v] = "undefined";
        q.push([v, dist[v]]);
      }
    }
    dist[source] = 0;

    while (q.length > 0) {
      const sq = q.sort(
        (a: [k: string, d: number], b: [k: string, d: number]) => a[1] - b[1]
      );
      const [uk, _] = sq[0];
      if (uk === this.end) {
        return [dist, prev];
      }
      q = sq.splice(1);

      const [ukx, uky] = uk.split("-").map(Number);
      let neighbors: string[] = [];
      if (ukx === 0) {
        neighbors.push(`${ukx + 1}-${uky}`);
      } else if (ukx === height - 1) {
        neighbors.push(`${ukx - 1}-${uky}`);
      } else {
        neighbors.push(`${ukx + 1}-${uky}`);
        neighbors.push(`${ukx - 1}-${uky}`);
      }
      if (uky === 0) {
        neighbors.push(`${ukx}-${uky + 1}`);
      } else if (uky === width - 1) {
        neighbors.push(`${ukx}-${uky - 1}`);
      } else {
        neighbors.push(`${ukx}-${uky - 1}`);
        neighbors.push(`${ukx}-${uky + 1}`);
      }

      neighbors.forEach((n) => {
        const qks = q.map((qi) => qi[0]);
        let alt: number;
        const [nx, ny] = n.split("-").map(Number);
        const diff0 =
          this.map[ukx][uky].charCodeAt(0) - this.map[nx][ny].charCodeAt(0) ===
          0;
        const diff1 =
          this.map[ukx][uky].charCodeAt(0) - this.map[nx][ny].charCodeAt(0) ===
          -1;
        const diffSa = uk === this.start && this.map[nx][ny] === "a";
        const diffzE = uk === "z" && n === this.end;
        let nearNeighbor = diff0 || diff1 || diffSa || diffzE;
        // uk to n is same character
        // uk to n is single character
        // uk is S and n is a
        // uk is z and n is z
        if (qks.includes(n) && nearNeighbor) {
          alt = dist[uk] + 1;
          if (alt < dist[n]) {
            dist[n] = alt;
            prev[n] = uk;
          }
        }
      });
    }

    return [dist, prev];
  }
}

const part1 = () => {
  hm.showMap();
  console.log(hm.dijkstra());
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
