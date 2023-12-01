import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const getN = (s: string) => {
  return Number(s);
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
const part2 = () => {};

let input: string[] = [];
const loadLine = (line: string) => {
  input.push(line);
};

rl.on("line", (line: string) => {
  loadLine(line);
});

rl.once("close", () => {
  console.log(part1());
  part2();
});
