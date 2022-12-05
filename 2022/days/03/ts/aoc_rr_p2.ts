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

  let commonChar;
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

const commonGroupType = (g1: string, g2: string, g3: string) => {
  let commonChar: string = "0";
  Array.from(g1).every((c) => {
    if (g2.includes(c) && g3.includes(c)) {
      commonChar = c;
      return false;
    } else {
      return true;
    }
  });
  return commonChar;
};

let priorities: number[] = [];
let elfGroup: string[] = [];

rl.on("line", (line: string) => {
  elfGroup.push(line.trim());

  if (elfGroup.length === 3) {
    const [g1, g2, g3] = elfGroup;
    const type = commonGroupType(g1, g2, g3);
    const typePriority = chars.indexOf(type);
    if (typePriority) {
      priorities.push(chars.indexOf(type));
    }
    elfGroup = [];
  }
});

rl.once("close", () => {
  console.log(priorities);
  console.log(priorities.reduce((a, b) => a + b, 0));
  // end of input
});
