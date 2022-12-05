const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const chars = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const commonType = (items: string) => {
  const nItems = items.length;
  const halfItems = Math.floor(nItems / 2);
  const c1 = items.substring(0, halfItems);
  const c2 = items.substring(halfItems);

  console.log({ nItems, halfItems, c1, c2 });

  let commonChar: string = "0";
  Array.from(c1).every((c) => {
    if (c2.includes(c)) {
      commonChar = c;
      return false;
    } else {
      return true;
    }
  });
  return commonChar;
};

let priorities: number[] = [];
rl.on("line", (line: string) => {
  console.log(line);
  const type = commonType(line.trim());
  const typePriority = chars.indexOf(type);
  if (typePriority) {
    priorities.push(chars.indexOf(type));
  }
});

rl.once("close", () => {
  console.log(priorities);
  console.log(priorities.reduce((a, b) => a + b, 0));
  // end of input
});
