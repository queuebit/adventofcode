import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

interface ScratchCard {
  n: number;
  winningNumbers: Set<number>;
  cardNumbers: Set<number>;
}

const cards: ScratchCard[] = [];
const readScratchoffCard = (line: string) => {
  const [c, winningN, cardN] = line
    .substring(5)
    .split(/[:\|]/)
    .map((s) => s.trim());
  const n: number = Number(c);
  const winningNumbers: Set<number> = new Set(
    winningN.split(/\s+/).map(Number)
  );
  const cardNumbers: Set<number> = new Set(cardN.split(/\s+/).map(Number));
  cards.push({ n, winningNumbers, cardNumbers });
  console.log({ n, winningNumbers, cardNumbers });
};

const part1 = () => {
  const scores = cards.map((c) => {
    const matches = Array.from(c.winningNumbers).filter((wn) =>
      c.cardNumbers.has(wn)
    ).length;
    return matches > 0 ? Math.pow(2, matches - 1) : 0;
  });
  console.log(scores);
  console.log(scores.reduce((acc, s) => acc + s, 0));
};
const part2 = () => {};

rl.on("line", (line: string) => {
  console.log(line);
  readScratchoffCard(line);
});

rl.once("close", () => {
  part1();
  part2();
});
