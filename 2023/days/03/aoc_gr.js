"use strict";
exports.__esModule = true;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var currentLine = 0;
var parts = [];
var symbols = [];
var readSchmatic = function (line, n) {
    var partMatches = Array.from(line.matchAll(/(?<part>\d+)/g));
    for (var _i = 0, partMatches_1 = partMatches; _i < partMatches_1.length; _i++) {
        var partMatch = partMatches_1[_i];
        parts.push({
            number: Number(partMatch[1]),
            location: {
                x: Number(partMatch.index),
                y: n
            }
        });
    }
    var symMatches = Array.from(line.matchAll(/(?<symbol>[*$@+%&\-\=\/#])/g));
    for (var _a = 0, symMatches_1 = symMatches; _a < symMatches_1.length; _a++) {
        var symMatch = symMatches_1[_a];
        symbols.push({
            symbol: symMatch[1] || "",
            location: {
                x: Number(symMatch.index),
                y: n
            }
        });
    }
};
rl.on("line", function (line) {
    currentLine++;
    readSchmatic(line, currentLine);
    // console.log(line);
});
var part1 = function () {
    console.log(parts);
    console.log(symbols.filter(function (s) { return s.symbol === "\\"; }));
    var partNumbers = parts.filter(function (p) {
        //left
        var lSymbols = symbols.filter(function (s) {
            return s.location.y === p.location.y && s.location.x === p.location.x - 1;
        });
        //right
        var rSymbols = symbols.filter(function (s) {
            return (s.location.y === p.location.y &&
                s.location.x === p.location.x + p.number.toString().length);
        });
        //up with corners
        var upSymbols = symbols.filter(function (s) {
            return (s.location.y === p.location.y - 1 &&
                s.location.x >= p.location.x - 1 &&
                s.location.x <= p.location.x + p.number.toString().length);
        });
        //down with corners
        var downSymbols = symbols.filter(function (s) {
            return (s.location.y === p.location.y + 1 &&
                s.location.x >= p.location.x - 1 &&
                s.location.x <= p.location.x + p.number.toString().length);
        });
        console.log(p.number, lSymbols.length, rSymbols.length, upSymbols.length, downSymbols.length);
        return (lSymbols.length > 0 ||
            rSymbols.length > 0 ||
            upSymbols.length > 0 ||
            downSymbols.length > 0);
    });
    console.log(partNumbers);
    console.log(parts.length);
    console.log(partNumbers.length);
    console.log(partNumbers.reduce(function (acc, p) { return acc + p.number; }, 0));
};
var part2 = function () { };
rl.once("close", function () {
    part1();
    part2();
});
