const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

class Monkey {
  name: number;
  has: number[];
  operation: (x: number) => number;
  inspections: number;
  testBy: number;
  trueTo: number;
  falseTo: number;

  constructor(
    name: number,
    starting: number[],
    operation: (x: number) => number,
    testBy: number,
    trueTo: number,
    falseTo: number
  ) {
    this.name = name;
    this.has = starting;
    this.operation = operation;
    this.testBy = testBy;
    this.trueTo = trueTo;
    this.falseTo = falseTo;
    this.inspections = 0;
  }

  catchItem(item: number) {
    this.has.push(item);
  }
}
const captureNotes = (notes: string[]) => {
  const monkeys: Monkey[] = new Array(Math.ceil(notes.length / 7))
    .fill(0)
    .map((_, i) => {
      const offset = 7 * i;

      const rMonkey = /^Monkey (?<name>\d+):$/;
      const nameMatch = notes[offset].match(rMonkey);
      let monkeyName =
        nameMatch && nameMatch.groups && nameMatch.groups.name
          ? Number(nameMatch.groups.name)
          : 999;

      const itemString = notes[offset + 1].substring(17).trim();
      const startingItems = itemString.split(", ").map(Number);

      let fOperation: (x: number) => number = (x: number) => x;
      const opString = notes[offset + 2].substring(19).trim();
      const rOld = /old/g;
      const rFunc = /^old (?<op>\+\/*\-) (?<operand>\w+)$/;
      const funcMatch = opString.match(rFunc);
      let op = "noop";
      let operand = 0;
      if (funcMatch && funcMatch.groups) {
        op = funcMatch.groups.op || "noop";
        operand =
          funcMatch.groups.operand === "old"
            ? 1
            : Number(funcMatch.groups.operand);
      }
      if ((opString.match(rOld) || []).length > 1) {
        switch (op) {
          case "+":
          case "-":
            fOperation = (x: number) => 2 * x;
            break;
          case "/":
            fOperation = (x: number) => 1;
            break;
          case "*":
            fOperation = (x: number) => x ** 2;
            break;
          default:
            fOperation = (x: number) => x;
            break;
        }
        fOperation = (x: number) => x;
      } else {
        switch (op) {
          case "+":
            fOperation = (x: number) => x + operand;
            break;
          case "-":
            fOperation = (x: number) => x - operand;
            break;
          case "/":
            fOperation = (x: number) => x / operand;
            break;
          case "*":
            fOperation = (x: number) => x * operand;
            break;
          default:
            fOperation = (x: number) => x;
            break;
        }
      }

      const rTest = /divisible by (?<divisor>\d+)$/;
      const testString = notes[offset + 3].trim();
      const testMatch = testString.match(rTest);
      const testBy: number =
        testMatch && testMatch.groups ? Number(testMatch.groups.divisor) : 1;

      const trueMoveString = notes[offset + 4].trim();
      const rThrowTo = /throw to monkey (?<mk>\d+)/;
      const trueMatch = trueMoveString.match(rThrowTo);
      const trueTo: number =
        trueMatch && trueMatch.groups ? Number(trueMatch.groups.mk) : 0;

      const falseMoveString = notes[offset + 5].trim();
      const falseMatch = falseMoveString.match(rThrowTo);
      const falseTo: number =
        falseMatch && falseMatch.groups ? Number(falseMatch.groups.mk) : 0;

      return new Monkey(
        monkeyName,
        startingItems,
        fOperation,
        testBy,
        trueTo,
        falseTo
      );
    });
  return monkeys;
};
const part1 = () => {};
const part2 = () => {};

let lines: string[] = [];
rl.on("line", (line: string) => {
  lines.push(line);
});

rl.once("close", () => {
  const monkeys: Monkey[] = captureNotes(lines);
  console.log(monkeys);
  part1();
  part2();
});
