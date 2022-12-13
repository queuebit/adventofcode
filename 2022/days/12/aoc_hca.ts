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

  dijkstra(source: string = this.start) {
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

    while (q.length > 300) {
      const sq = q.sort((a, b) => {
        return dist[a] - dist[b];
      });
      const uk = sq[0];
      console.log(uk);
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

      neighbors.forEach((v) => {
        let alt: number;
        const [nx, ny] = v.split("-").map(Number);
        const uChar = this.map[ukx][uky];
        const uHeight = uChar.charCodeAt(0);
        const nChar = this.map[nx][ny];
        const nHeight = nChar.charCodeAt(0);
        const diff0 = uHeight - nHeight === 0;
        const diff1 = Math.abs(uHeight - nHeight) === 1;
        const diffSa = uk === this.start && nChar === "a";
        const diffzE = uChar === "z" && v === this.end;
        let nearNeighbor = diff0 || diff1 || diffSa || diffzE;
        if (uChar === "y" && nChar === "z") {
          console.log("YZ");
          console.log({
            q,
            uk,
            v,
            uChar,
            nChar,
            diff0,
            diff1,
            diffSa,
            diffzE,
            nearNeighbor,
            inList: q.includes(v),
          });
        }
        // uk to n is same character
        // uk to n is single character
        // uk is S and n is a
        // uk is z and n is z
        if (q.includes(v) && nearNeighbor) {
          alt = dist[uk] + 1;
          console.log({ alt, uk, v });
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
  hm.showMap();
  const [dist, prev] = hm.dijkstra();

  console.log(hm.start);
  console.log(hm.end);
  console.log(JSON.stringify(prev));
  console.log(JSON.stringify(dist));
  console.log(
    Object.values(dist)
      .filter((d) => d !== 999999)
      .sort((a, b) => b - a)
  );
  console.log(dist[hm.end]);
  /* 
  That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data;
  there are also some general tips on the about page,
  or you can ask for hints on the subreddit.
  Please wait one minute before trying again. (You guessed 257.) [Return to Day 12]
  */
  // https://mastodon.social/@joshburnett@fosstodon.org/109506776118491499
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
