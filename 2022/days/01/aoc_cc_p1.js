const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  console.log(line);
});

rl.once("close", () => {
  console.log("done");
  // end of input
});
