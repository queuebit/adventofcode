const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let elves = 0;
let elfDiet = 0;
let appetites = [];

const elfCount = () => {
  elves += 1;
  appetites.push(elfDiet);
  console.log(`Elf #${elves} Diet: ${elfDiet}`);
  elfDiet = 0;
};

rl.on("line", (line) => {
  if (line.trim() === "") {
    console.log(line);
    elfCount();
  } else {
    elfDiet += parseInt(line.trim(), 10);
  }
});

rl.once("close", () => {
  elfCount();
  console.log("done");
  console.log(appetites);
  const bigAppetiteElves = appetites.sort((a, b) => b - a);
  console.log(bigAppetiteElves);
  const bigThree = bigAppetiteElves.slice(0, 3);
  const threeTotal = bigThree.reduce((a, b) => a + b, 0);
  console.log(bigThree);
  console.log(threeTotal);
  // end of input
});
