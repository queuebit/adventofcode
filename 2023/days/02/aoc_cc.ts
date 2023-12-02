import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

interface Round {
  red: number;
  green: number;
  blue: number;
}

type color = "red" | "blue" | "green";

const getColor = (c: string | undefined): color => {
  switch (c) {
    case "red":
      return "red";
    case "green":
      return "green";
    case "blue":
      return "blue";
    default:
      return "red";
  }
};

class Game {
  gameId: number = 0;
  rounds: Round[] = [];

  constructor(desc: string) {
    const match = desc.match(/Game (?<gameId>\d+): (?<rounds>.+)/);
    if (match) {
      const { groups } = match;
      this.gameId = Number(groups?.gameId);

      this.rounds = (groups?.rounds || "").split("; ").map((r) => {
        const round: Round = { red: 0, green: 0, blue: 0 };
        r.split(", ").forEach((c) => {
          const cMatch = c.match(/(?<count>\d+) (?<color>(red|blue|green))/);
          if (cMatch) {
            const cGroups = cMatch.groups;
            const color: color = getColor(cGroups?.color);
            const count: number = Number(cGroups?.count || 0);
            round[color] = count;
          }
        });
        console.log(round);
        return round;
      });
    }
  }
}

const part1 = (games: Game[]) => {
  const scenario: Round = { red: 12, green: 13, blue: 14 };
  const possibleGames = games.filter((g) => {
    return g.rounds.every(
      (r) =>
        r.green <= scenario.green &&
        r.blue <= scenario.blue &&
        r.red <= scenario.red
    );
  });
  console.log(possibleGames);
  console.log(possibleGames.reduce((acc, g) => acc + g.gameId, 0));
};
const part2 = () => {};

const games: Game[] = [];
rl.on("line", (line: string) => {
  console.log(line);
  games.push(new Game(line));
});

rl.once("close", () => {
  part1(games);
  // 2751 - too high
  part2();
});
