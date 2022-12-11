const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

type Command = { op: string; args: (number | string)[] };

let program: string[] = [];
rl.on("line", (line: string) => {
  program.push(line);
});

rl.once("close", () => {
  part1();
  part2();
});

function part1() {
  console.log(program.length);
  let executable = program.map((line: string) => {
    const command = line.split(" ");
    let res: Command;
    if (command[0] === "addx") {
      res = {
        op: command[0],
        args: command.slice(1),
      };
    } else {
      res = {
        op: command[0],
        args: [],
      };
    }
    return res;
  });
  let regX: number[] = [1];
  executable.forEach((r) => {
    if (r.op === "noop") {
      regX.push(0);
    } else if (r.op === "addx") {
      regX.push(0);
      regX.push(Number(r.args[0]));
    }
  });
  console.log(regX);
  const sum = (a: number, b: number) => a + b;
  console.log(regX.slice(0, 6).reduce((a, b) => a + b));
  const samples = [20, 60, 100, 140, 180, 220];
  let signalStrengths: number[] = [];
  samples.forEach((s) => {
    const register = regX.slice(0, s).reduce(sum);
    const signalStrength = s * register;
    signalStrengths.push(signalStrength);
  });
  console.log(signalStrengths);
  console.log(signalStrengths.reduce(sum));
}
function part2() {}
