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
    const NNN = 999999;

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
        (a: [k: string, d: number], b: [k: string, d: number]) => {
          return dist[a[0]] - dist[b[0]];
        }
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
        const uChar = this.map[ukx][uky];
        const uHeight = uChar.charCodeAt(0);
        const nChar = this.map[nx][ny];
        const nHeight = nChar.charCodeAt(0);
        const diff0 = uHeight - nHeight === 0;
        const diff1 = Math.abs(uHeight - nHeight) === 1;
        const diffSa = uk === this.start && nChar === "a";
        const diffzE = uChar === "z" && n === this.end;
        let nearNeighbor = diff0 || diff1 || diffSa || diffzE;
        // console.log({
        //   q,
        //   qks,
        //   n,
        //   uChar,
        //   nChar,
        //   diff0,
        //   diff1,
        //   diffSa,
        //   diffzE,
        //   nearNeighbor,
        //   inList: qks.includes(n),
        // });
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
  const [dist, _] = hm.dijkstra();

  // const [dist, prev] = hm.dijkstra();
  // let journey: string[][] = [];
  // Object.keys(prev).forEach((k, i) => {
  //   const [kx, ky] = k.split("-").map(Number);
  //   let jp: string = ".";
  //   if (prev[k] === "undefined") {
  //     jp = "S";
  //   }
  //   if (typeof prev[k] === "number") {
  //     jp = ".";
  //   } else {
  //     const [px, py] = prev[k].toString().split("-").map(Number);
  //     if (kx < px) {
  //       jp = "v";
  //     } else if (kx > px) {
  //       jp = "^";
  //     } else if (ky > py) {
  //       jp = ">";
  //     } else if (ky < py) {
  //       jp = "<";
  //     }
  //   }

  //   if (kx === journey.length) {
  //     journey.push([]);
  //   }
  //   if (ky >= journey[kx].length) {
  //     journey[kx].concat(Array(ky - journey[kx].length).fill("."));
  //   }
  //   journey[kx].push(jp);
  // });
  // journey.forEach((j) => console.log(j.join("")));

  const paths = Object.values(dist).filter((d) => d !== 999999);
  console.log(paths.sort((a: number, b: number) => b - a));
  /* 
  That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data;
  there are also some general tips on the about page,
  or you can ask for hints on the subreddit.
  Please wait one minute before trying again. (You guessed 257.) [Return to Day 12]
  */
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
