"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var range = function (elfRange) {
    var _a = elfRange.split("-").map(Number), start = _a[0], end = _a[1];
    var r = new Set();
    for (var i = start; i <= end; i++) {
        r.add(i);
    }
    return r;
};
var partiallyContained = function (a, b) {
    var intersection = new Set(Array.from(a).filter(function (x) { return b.has(x); }));
    return intersection.size > 0;
};
var fullyContained = function (a, b) {
    var intersection = new Set(Array.from(a).filter(function (x) { return b.has(x); }));
    return intersection.size === a.size;
};
var partiallyContainedPairs = 0;
rl.on("line", function (line) {
    var _a = line.split(",").map(range), elfA = _a[0], elfB = _a[1];
    if (partiallyContained(elfA, elfB) || partiallyContained(elfB, elfA)) {
        // console.log({ elfA, elfB, sA: elfA.size, sB: elfB.size });
        partiallyContainedPairs += 1;
    }
});
rl.once("close", function () {
    console.log(partiallyContainedPairs);
    // end of input
});
