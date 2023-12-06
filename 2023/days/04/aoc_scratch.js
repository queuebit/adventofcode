"use strict";
exports.__esModule = true;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var cards = [];
var readScratchoffCard = function (line) {
    var _a = line
        .substring(5)
        .split(/[:\|]/)
        .map(function (s) { return s.trim(); }), c = _a[0], winningN = _a[1], cardN = _a[2];
    var n = Number(c);
    var winningNumbers = new Set(winningN.split(/\s+/).map(Number));
    var cardNumbers = new Set(cardN.split(/\s+/).map(Number));
    cards.push({ n: n, winningNumbers: winningNumbers, cardNumbers: cardNumbers });
    console.log({ n: n, winningNumbers: winningNumbers, cardNumbers: cardNumbers });
};
var part1 = function () {
    var scores = cards.map(function (c) {
        var matches = Array.from(c.winningNumbers).filter(function (wn) {
            return c.cardNumbers.has(wn);
        }).length;
        return matches > 0 ? Math.pow(2, matches - 1) : 0;
    });
    console.log(scores);
    console.log(scores.reduce(function (acc, s) { return acc + s; }, 0));
};
var part2 = function () {
    var cardCopies = new Map();
    cards.forEach(function (c) { return cardCopies.set(c.n, 1); });
    cards.forEach(function (c) {
        var matches = Array.from(c.winningNumbers).filter(function (wn) {
            return c.cardNumbers.has(wn);
        }).length;
        var thisCardCopies = cardCopies.get(c.n) || 0;
        for (var i = 1; i <= matches; i++) {
            var before = cardCopies.get(c.n + i) || 0;
            cardCopies.set(c.n + i, before + thisCardCopies);
        }
        console.log(Array.from(cardCopies.values()));
    });
    console.log(Array.from(cardCopies.values()).reduce(function (acc, s) { return acc + s; }, 0));
};
rl.on("line", function (line) {
    console.log(line);
    readScratchoffCard(line);
});
rl.once("close", function () {
    part1();
    console.log();
    part2();
});
