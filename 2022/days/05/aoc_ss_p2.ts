const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const MODES: { [key: string]: number } = {
  crates: 0,
  stacks: 1,
  instructions: 2,
  done: 9,
};
const loadCrates = (initCrates: string[], nStacks: number) => {
  let stacks: string[][] = [];
  // setup stacks
  for (var i = 0; i < nStacks; i++) {
    stacks.push([]);
  }
  const stackHeight = initCrates.length - 1;
  for (let cratesDown = stackHeight; cratesDown >= 0; cratesDown--) {
    for (let s = 0; s < nStacks; s++) {
      const crateIDLoc = s * 4 + 1;
      const crateID = initCrates[cratesDown].charAt(crateIDLoc);
      if (crateID.trim().length > 0) {
        stacks[s].push(crateID);
      }
    }
  }
  return stacks;
};

const craneOps9000 = (stacks: string[][], instructions: string[]) => {
  instructions.forEach((instruction) => {
    const regexpInstruction = /move (\d+) from (\d+) to (\d+)/;
    const match = instruction.match(regexpInstruction);
    if (match) {
      const [nCrates, fromStack, toStack] = [match[1], match[2], match[3]].map(
        Number
      );

      for (let c = 0; c < nCrates; c++) {
        const fromStackID = fromStack - 1;
        const toStackID = toStack - 1;
        const moveCrate = stacks[fromStackID].pop();
        if (moveCrate !== undefined) {
          stacks[toStackID].push(moveCrate);
        }
      }
    }
  });
};

const craneOps9001 = (stacks: string[][], instructions: string[]) => {
  instructions.forEach((instruction) => {
    const regexpInstruction = /move (\d+) from (\d+) to (\d+)/;
    const match = instruction.match(regexpInstruction);
    if (match) {
      const [nCrates, fromStack, toStack] = [match[1], match[2], match[3]].map(
        Number
      );
      const fromStackID = fromStack - 1;
      const toStackID = toStack - 1;
      const cratesInFromStack = stacks[fromStackID].length;
      const moveFromStackHeight = cratesInFromStack - nCrates;
      const unmovedCrates = stacks[fromStackID].slice(0, moveFromStackHeight);
      const movedCrates = stacks[fromStackID].slice(moveFromStackHeight);
      stacks[fromStackID] = unmovedCrates;
      stacks[toStackID] = stacks[toStackID].concat(movedCrates);
    }
  });
};

const topCrates = (stacks: string[][]) => {
  return stacks.map((s) => s.pop()).join("");
};

let mode = MODES.crates;
let initCrates: string[] = [];
let nStacks: number;
let instructions: string[] = [];
rl.on("line", (line: string) => {
  if (mode === MODES.crates) {
    if (line.includes("[")) {
      // capture containers
      initCrates.push(line);
      console.log(`stack of containers: ${line}`);
    } else {
      mode = MODES.stacks;
      // capture stacks
      nStacks = Number(line.trim().split(" ").pop());
      console.log(`stack identifiers: ${nStacks}`);
    }
  } else if (mode === MODES.stacks) {
    if (line.trim().length === 0) {
      mode = MODES.instructions;
      console.log("INSTRUCTIONS BLANK");
    } else {
      console.log("NOOP ERROR");
    }
  } else if (mode === MODES.instructions) {
    console.log(line);
    instructions.push(line);
  }
});

rl.once("close", () => {
  mode = MODES.done;
  console.log({ initCrates, nStacks, instructions });
  console.log("done", { mode });

  // move string crates (by 3 char?) to string[][], stack based using stacks
  let stacks = loadCrates(initCrates, nStacks);
  console.log(stacks);

  // loop through instructions - push / pop
  craneOps9001(stacks, instructions);
  console.log(stacks);

  // capture top crates
  console.log(topCrates(stacks));
});
