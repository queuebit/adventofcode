"use strict";
exports.__esModule = true;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var DIGITS = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};
var getN = function (s) {
    return Number(s);
};
var spelledOut = function (s) {
    if (Number.isInteger(DIGITS[s])) {
        return Number(DIGITS[s]);
    }
    else {
        if (Object.keys(DIGITS).some(function (d) { return d.startsWith(s) || d.endsWith(s); })) {
            return s;
        }
        else {
            return;
        }
    }
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
var part2 = function () {
    return input
        .map(function (line) {
        console.log(line);
        var o = 0;
        var first;
        var last;
        var l = line.length;
        var fWord = "";
        var bWord = "";
        while (typeof first === "undefined" || typeof last === "undefined") {
            var ac = line.charAt(o);
            var bc = line.charAt(l - o - 1);
            var a = getN(ac);
            var b = getN(bc);
            fWord = "".concat(fWord).concat(ac);
            bWord = "".concat(bc).concat(bWord);
            if (typeof first === "undefined") {
                if (Number.isInteger(a)) {
                    first = a;
                }
                else if (Number.isInteger(spelledOut(fWord))) {
                    first = Number(spelledOut(fWord));
                }
                else {
                    fWord = spelledOut(fWord) || fWord.slice(1);
                }
            }
            if (typeof last === "undefined") {
                if (Number.isInteger(b)) {
                    last = b;
                }
                else if (Number.isInteger(spelledOut(bWord))) {
                    last = Number(spelledOut(bWord));
                }
                else {
                    bWord = spelledOut(bWord) || bc;
                }
            }
            o += 1;
        }
        return Number("".concat(first).concat(last));
    })
        .reduce(function (acc, v) {
        return acc + v;
    }, 0);
};
var input = [];
var loadLine = function (line) {
    input.push(line);
};
rl.on("line", function (line) {
    loadLine(line);
});
rl.once("close", function () {
    console.log(part1());
    console.log();
    console.log(part2());
});
