import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

enum ReadMode {
  Seeds,
  MapType,
  Transform,
}
enum Delta {
  Op,
  NoOp,
}
interface TResult {
  value: number;
  op: Delta;
}
interface Transform {
  from: string;
  to: string;
  func: (n: number) => TResult;
}

let seeds: number[] = [];
let transforms: Transform[] = [];
let from: string = "";
let to: string = "";

const parseInstructions = (line: string) => {
  switch (mode) {
    case ReadMode.Seeds:
      if (line === "") {
        mode = ReadMode.MapType;
      } else {
        seeds = line.split(":")[1].trim().split(" ").map(Number);
      }
      break;
    case ReadMode.MapType:
      [from, to] = line.split(" ")[0].split("-to-");
      mode = ReadMode.Transform;
      break;
    case ReadMode.Transform:
      if (line === "") {
        mode = ReadMode.MapType;
      } else {
        const [t, i, f] = line.split(" ").map(Number).slice(0, 3);
        transforms.push({
          from,
          to,
          func: (input: number) => {
            if (input < i || input > i + f) {
              return { value: input, op: Delta.NoOp };
            } else {
              return { value: t + (input - i), op: Delta.Op };
            }
          },
        });
      }
      break;
    default:
      break;
  }
};

const part1 = () => {
  const locations = seeds.map((s) => {
    let v = s;
    let lifecycles = [
      "seed",
      "soil",
      "fertilizer",
      "water",
      "light",
      "temperature",
      "humidity",
      "location",
    ];
    for (let l = 0; l < lifecycles.length; l++) {
      let ts = transforms.filter((t) => t.from === lifecycles[l]);

      for (const t of ts) {
        const result = t.func(v);
        if (result.op === Delta.Op) {
          v = result.value;
          console.log("op", result, t.from, "-to-", t.to);
          break;
        }
        console.log("noop", result, t.from, "-to-", t.to);
      }
    }
    return v;
  });
  console.log({ locations });
  console.log(Math.min(...locations));
};
const part2 = () => {};

let mode: ReadMode = ReadMode.Seeds;
rl.on("line", (line: string) => {
  parseInstructions(line.trim());
});

rl.once("close", () => {
  console.log(seeds, transforms);
  part1();
  part2();
});
