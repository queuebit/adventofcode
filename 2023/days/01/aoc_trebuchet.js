"use strict";
exports.__esModule = true;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var part1 = function () { };
var part2 = function () { };
rl.on("line", function (line) {
    console.log(line);
});
rl.once("close", function () {
    part1();
    part2();
});
