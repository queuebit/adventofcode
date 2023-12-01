import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const DIGITS: { [key: string]: number | undefined } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getN = (s: string) => {
  return Number(s);
};

const spelledOut = (s: string): string | number | undefined => {
  if (Number.isInteger(DIGITS[s])) {
    return Number(DIGITS[s]);
  } else {
    if (Object.keys(DIGITS).some((d) => d.startsWith(s) || d.endsWith(s))) {
      return s;
    } else {
      return;
    }
  }
};

const part1 = () => {
  return input
    .map((line) => {
      console.log(line);

      let o: number = 0;
      let first: number | undefined;
      let last: number | undefined;
      let l = line.length;
      while (typeof first === "undefined" || typeof last === "undefined") {
        const a = getN(line.charAt(o));
        const b = getN(line.charAt(l - o - 1));
        if (typeof first === "undefined" && Number.isInteger(a)) {
          first = a;
        }
        if (typeof last === "undefined" && Number.isInteger(b)) {
          last = b;
        }

        o += 1;
      }
      return Number(`${first}${last}`);
    })
    .reduce((acc, v) => {
      return acc + v;
    }, 0);
};
const part2 = () => {
  return input
    .map((line) => {
      console.log(line);

      let o: number = 0;
      let first: number | undefined;
      let last: number | undefined;
      let l = line.length;

      let fWord: string | number = "";
      let bWord: string | number = "";
      while (typeof first === "undefined" || typeof last === "undefined") {
        const ac = line.charAt(o);
        const bc = line.charAt(l - o - 1);

        const a = getN(ac);
        const b = getN(bc);

        fWord = `${fWord}${ac}`;
        bWord = `${bc}${bWord}`;

        if (typeof first === "undefined") {
          if (Number.isInteger(a)) {
            first = a;
          } else if (Number.isInteger(spelledOut(fWord))) {
            first = Number(spelledOut(fWord));
          } else {
            fWord = spelledOut(fWord) || fWord.slice(1);
          }
        }
        if (typeof last === "undefined") {
          if (Number.isInteger(b)) {
            last = b;
          } else if (Number.isInteger(spelledOut(bWord))) {
            last = Number(spelledOut(bWord));
          } else {
            bWord = spelledOut(bWord) || bc;
          }
        }

        o += 1;
      }
      return Number(`${first}${last}`);
    })
    .reduce((acc, v) => {
      return acc + v;
    }, 0);
};

let input: string[] = [];
const loadLine = (line: string) => {
  input.push(line);
};

rl.on("line", (line: string) => {
  loadLine(line);
});

rl.once("close", () => {
  console.log(part1());
  console.log();
  console.log(part2());
});
