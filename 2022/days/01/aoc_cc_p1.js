const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let elves = 0;
let elfDiet = 0;
let appetites = [];

rl.on("line", (line) => {
  console.log(line);
  if (line.trim() === "") {
    elves += 1;
    appetites.push(elfDiet);
    console.log(`Elf #${elves} Diet: ${elfDiet}`);
    elfDiet = 0;
  } else {
    elfDiet += parseInt(line.trim(), 10);
  }
});

rl.once("close", () => {
  console.log("done");
  console.log(appetites);
  console.log(Math.max(...appetites));
  // end of input
});
