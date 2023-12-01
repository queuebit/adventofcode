"use strict";
exports.__esModule = true;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var getN = function (s) {
    return Number(s);
};
var part1 = function () {
    return input
        .map(function (line) {
        console.log(line);
        var o = 0;
        var first;
        var last;
        var l = line.length;
        while (typeof first === "undefined" || typeof last === "undefined") {
            var a = getN(line.charAt(o));
            var b = getN(line.charAt(l - o - 1));
            if (typeof first === "undefined" && Number.isInteger(a)) {
                first = a;
            }
            if (typeof last === "undefined" && Number.isInteger(b)) {
                last = b;
            }
            o += 1;
        }
        return Number("".concat(first).concat(last));
    })
        .reduce(function (acc, v) {
        return acc + v;
    }, 0);
};
var part2 = function () { };
var input = [];
var loadLine = function (line) {
    input.push(line);
};
rl.on("line", function (line) {
    loadLine(line);
});
rl.once("close", function () {
    console.log(part1());
    part2();
});
