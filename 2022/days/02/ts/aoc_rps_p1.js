"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var elves = 0;
var elfDiet = 0;
var appetites = [];
var HAND_CODES = {
    A: "rock",
    B: "paper",
    C: "scissors",
    X: "rock",
    Y: "paper",
    Z: "scissors"
};
var GAME_RESULTS = {
    // them:me
    "rock:rock": "draw",
    "paper:paper": "draw",
    "scissors:scissors": "draw",
    "rock:paper": "win",
    "paper:scissors": "win",
    "scissors:rock": "win",
    "rock:scissors": "lose",
    "paper:rock": "lose",
    "scissors:paper": "lose"
};
var HAND_SCORES = {
    rock: 1,
    paper: 2,
    scissors: 3
};
var GAME_SCORES = {
    win: 6,
    draw: 3,
    lose: 0
};
var scoreGame = function (them, me) {
    var hand_score = HAND_SCORES[me];
    var game_hands = "".concat(them, ":").concat(me);
    var game_result = GAME_RESULTS[game_hands];
    var game_score = GAME_SCORES[game_result];
    // console.log(game_hands, game_result, hand_score, game_score);
    return hand_score + game_score;
};
var scores = [];
rl.on("line", function (line) {
    console.log(line);
    var _a = line
        .trim()
        .split(" ")
        .map(function (x) { return HAND_CODES[x]; }), them = _a[0], me = _a[1];
    var score = scoreGame(them, me);
    // console.log(score);
    scores.push(score);
});
rl.once("close", function () {
    var scoreTotal = scores.reduce(function (a, b) { return a + b; }, 0);
    console.log(scoreTotal);
    // end of input
});
