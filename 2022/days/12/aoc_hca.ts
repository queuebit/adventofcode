const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// let node = "32-148"; // e
// let node = "35-140"; // e
// let node = "34-140"; // l
// let node = "32-132"; // f
// let DEBUG = "31-132"; // g
// let DEBUG = "27-124"; // g
// let DEBUG = "25-124"; // h
// let DEBUG = "18-126"; // h
// let DEBUG = "17-126"; // i
// let DEBUG = "9-128"; // i
// let DEBUG = "9-129"; // j - ENDS, with no k
// let DEBUG = "28-147"; // j - alt is 1000000
// let DEBUG = "29-147"; // k - alt is 1000000
let DEBUG = "19-148"; // i

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

    while (q.length > 0) {
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
        const diff1 = uHeight - nHeight === -1;
        const diffSa = uk === this.start && nChar === "a";
        const diffzE = uChar === "z" && v === this.end;
        let nearNeighbor = diff0 || diff1 || diffSa || diffzE;
        if (uk === DEBUG) {
          console.log("DEBUG");
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

  let node = DEBUG;
  console.log();
  console.log(`==== PATH FINDING ====`);
  console.log(node);
  while (prev[node]) {
    node = prev[node].toString();
    console.log(node);
  }
  console.log();

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
