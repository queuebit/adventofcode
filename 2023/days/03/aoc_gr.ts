import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

interface Part {
  number: number;
  location: { x: number; y: number };
}

interface Symbol {
  symbol: string;
  location: { x: number; y: number };
}

let currentLine: number = 0;
const parts: Part[] = [];
const symbols: Symbol[] = [];

const readSchmatic = (line: string, n: number) => {
  const partMatches = Array.from(line.matchAll(/(?<part>\d+)/g));
  for (const partMatch of partMatches) {
    parts.push({
      number: Number(partMatch[1]),
      location: {
        x: Number(partMatch.index),
        y: n,
      },
    });
  }

  const symMatches = Array.from(line.matchAll(/(?<symbol>[*$@+%&\-\=\/#])/g));
  for (const symMatch of symMatches) {
    symbols.push({
      symbol: symMatch[1] || "",
      location: {
        x: Number(symMatch.index),
        y: n,
      },
    });
  }
};

rl.on("line", (line: string) => {
  currentLine++;
  readSchmatic(line, currentLine);
  // console.log(line);
});

const part1 = () => {
  // console.log(parts);

  const partNumbers = parts.filter((p) => {
    //left
    const lSymbols = symbols.filter((s) => {
      return s.location.y === p.location.y && s.location.x === p.location.x - 1;
    });
    //right
    const rSymbols = symbols.filter((s) => {
      return (
        s.location.y === p.location.y &&
        s.location.x === p.location.x + p.number.toString().length
      );
    });
    //up with corners
    const upSymbols = symbols.filter((s) => {
      return (
        s.location.y === p.location.y - 1 &&
        s.location.x >= p.location.x - 1 &&
        s.location.x <= p.location.x + p.number.toString().length
      );
    });

    //down with corners
    const downSymbols = symbols.filter((s) => {
      return (
        s.location.y === p.location.y + 1 &&
        s.location.x >= p.location.x - 1 &&
        s.location.x <= p.location.x + p.number.toString().length
      );
    });

    // console.log(
    //   p.number,
    //   lSymbols.length,
    //   rSymbols.length,
    //   upSymbols.length,
    //   downSymbols.length
    // );
    return (
      lSymbols.length > 0 ||
      rSymbols.length > 0 ||
      upSymbols.length > 0 ||
      downSymbols.length > 0
    );
  });
  // console.log(partNumbers);
  // console.log(parts.length);
  // console.log(partNumbers.length);
  console.log(partNumbers.reduce((acc, p) => acc + p.number, 0));
};
const part2 = () => {
  const possibleGears = symbols.filter((s) => s.symbol === "*");
  console.log(possibleGears);

  const gearRatios = possibleGears.map((s) => {
    //left
    const lParts = parts.filter((p) => {
      return s.location.y === p.location.y && s.location.x === p.location.x - 1;
    });
    //right
    const rParts = parts.filter((p) => {
      return (
        s.location.y === p.location.y &&
        s.location.x === p.location.x + p.number.toString().length
      );
    });

    //up with corners
    const upParts = parts.filter((p) => {
      return (
        s.location.y === p.location.y - 1 &&
        s.location.x >= p.location.x - 1 &&
        s.location.x <= p.location.x + p.number.toString().length
      );
    });

    //down with corners
    const downParts = parts.filter((p) => {
      return (
        s.location.y === p.location.y + 1 &&
        s.location.x >= p.location.x - 1 &&
        s.location.x <= p.location.x + p.number.toString().length
      );
    });

    if (
      lParts.length + rParts.length + upParts.length + downParts.length ===
      2
    ) {
      return [...lParts, ...rParts, ...upParts, ...downParts].reduce(
        (acc, p) => acc * p.number,
        1
      );
    } else {
      return 0;
    }
  });
  console.log(gearRatios);
  console.log(gearRatios.reduce((acc, gr) => acc + gr, 0));
};

rl.once("close", () => {
  part1();
  part2();
});
