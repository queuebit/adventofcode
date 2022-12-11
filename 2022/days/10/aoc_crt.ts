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

const sum = (a: number, b: number) => a + b;
const runProgram = (program: string[]) => {
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
  return regX;
};
rl.once("close", () => {
  const registers = runProgram(program);
  part1(registers);
  part2(registers);
});

function part1(regX: number[]) {
  console.log(regX);
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
function part2(regX: number[]) {
  console.log(regX);
  let screen: string[] = [];
  regX.forEach((_, cycle) => {
    const r = regX.slice(0, cycle + 1).reduce(sum);
    if (Math.abs(r - (cycle % 40)) <= 1) {
      screen.push("#");
    } else {
      screen.push(".");
    }
  });

  console.log(screen.slice(0, 40).join(""));
  console.log(screen.slice(40, 80).join(""));
  console.log(screen.slice(80, 120).join(""));
  console.log(screen.slice(120, 160).join(""));
  console.log(screen.slice(160, 200).join(""));
  console.log(screen.slice(200, 240).join(""));
}
