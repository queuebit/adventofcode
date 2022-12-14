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
    }
    if (row.includes("E")) {
      this.end = `${currentRow}-${row.indexOf("E")}`;
    }
  }

  showMap() {
    for (let r = 0; r < this.map.length; r++) {
      console.log(this.map[r].join("|"));
    }
  }

  dijkstra(
    source: string = this.start,
    end: string = this.end,
    stopChar: string = ""
  ) {
    let q: string[] = [];
    let dist: { [key: string]: number } = {};
    let prev: { [key: string]: string } = {};
    const NNN = 999999;

    const height = this.map.length;
    const width = this.map[0].length;
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const v = `${r}-${c}`;
        dist[v] = NNN;
        prev[v] = "undefined";
        q.push(v);
      }
    }
    dist[source] = 0;

    while (q.length > 0) {
      const sq = q.sort((a, b) => {
        return dist[a] - dist[b];
      });
      const uk = sq[0];
      q = sq.splice(1);
      const [ukx, uky] = uk.split("-").map(Number);
      if (!stopChar && uk === this.end) {
        return [dist, prev];
      } else if (stopChar && this.map[ukx][uky] === stopChar) {
        return [{ uk: dist[uk] }, {}];
      }

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

      neighbors.forEach((v) => {
        let alt: number;
        const [nx, ny] = v.split("-").map(Number);
        let nearNeighbor: boolean;
        if (stopChar) {
          const uChar = this.map[ukx][uky] === "E" ? "z" : this.map[ukx][uky];
          const uHeight = uChar.charCodeAt(0);
          const nChar = this.map[nx][ny] === "S" ? "a" : this.map[nx][ny];
          const nHeight = nChar.charCodeAt(0);
          const diff0 = uHeight - nHeight === 0;
          const diff1 = nHeight - uHeight === -1;
          const diffDown = nHeight - uHeight > 0;
          nearNeighbor = diff0 || diff1 || diffDown;
        } else {
          const uChar = this.map[ukx][uky] === "S" ? "a" : this.map[ukx][uky];
          const uHeight = uChar.charCodeAt(0);
          const nChar = this.map[nx][ny] === "E" ? "z" : this.map[nx][ny];
          const nHeight = nChar.charCodeAt(0);
          const diff0 = uHeight - nHeight === 0;
          const diff1 = uHeight - nHeight === -1;
          const diffDown = uHeight - nHeight > 0;
          nearNeighbor = diff0 || diff1 || diffDown;
        }

        if (q.includes(v) && nearNeighbor) {
          alt = dist[uk] + 1;
          // console.log({ alt, du: dist[uk], v, dv: dist[v] });
          if (alt < dist[v]) {
            dist[v] = alt;
            prev[v] = uk;
          }
        }
      });
    }

    return [dist, prev];
  }
}

const part1 = () => {
  // hm.showMap();
  const [dist, _] = hm.dijkstra();

  // let node = hm.end;
  // console.log();
  // console.log(`==== PATH FINDING ====`);
  // console.log(node);
  // while (prev[node]) {
  //   node = prev[node].toString();
  //   console.log(node);
  // }
  // console.log();

  console.log(dist[hm.end]);
  // https://mastodon.social/@joshburnett@fosstodon.org/109506776118491499
};
const part2 = () => {
  const start = hm.start;
  const end = hm.end;
  hm.start = end;
  hm.end = start;
  const [dist, _] = hm.dijkstra(end, start, "a");
  console.log(Object.values(dist)[0]);
};

let hm = new HeightMap();
rl.on("line", (line: string) => {
  hm.addRow(Array.from(line));
});

rl.once("close", () => {
  part1();
  part2();
});
