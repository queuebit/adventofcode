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

const HAND_CODES = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
};
const GAME_RESULTS = {
  // them:me
  "rock:rock": "draw",
  "paper:paper": "draw",
  "scissors:scissors": "draw",
  "rock:paper": "win",
  "paper:scissors": "win",
  "scissors:rock": "win",
  "rock:scissors": "lose",
  "paper:rock": "lose",
  "scissors:paper": "lose",
};
const HAND_SCORES = {
  rock: 1,
  paper: 2,
  scissors: 3,
};
const GAME_SCORES = {
  win: 6,
  draw: 3,
  lose: 0,
};

const scoreGame = (them, me) => {
  const hand_score = HAND_SCORES[me];
  const game_hands = `${them}:${me}`;
  const game_result = GAME_RESULTS[game_hands];
  const game_score = GAME_SCORES[game_result];
  // console.log(game_hands, game_result, hand_score, game_score);
  return hand_score + game_score;
};

let scores = [];
rl.on("line", (line) => {
  console.log(line);
  const score = scoreGame(
    ...line
      .trim()
      .split(" ")
      .map((x) => HAND_CODES[x])
  );
  // console.log(score);
  scores.push(score);
});

rl.once("close", () => {
  const scoreTotal = scores.reduce((a, b) => a + b, 0);
  console.log(scoreTotal);
  // end of input
});
