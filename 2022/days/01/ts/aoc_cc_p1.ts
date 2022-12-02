import * as readline from "readline";
import { stdin as input, stdout as output } from "process";

type RL = readline.Interface;
type SomeFunction = (rl: RL) => (line: string) => string;

const elfAppetite: SomeFunction = (rl) => (line) => {
  return line;
};

export const main = (): void => {
  const rl = readline.createInterface({ input, output });

  console.log("Please insert the data.");

  let cals: string[] = [];

  // reads line by line and calls someFunction(rl)(line)
  rl.on("line", () => {
    const appetite: string = elfAppetite()(rl);
    cals.push(appetite);
  });
};

main();
