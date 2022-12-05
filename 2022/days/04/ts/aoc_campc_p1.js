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
var fullyContained = function (a, b) {
    var intersection = new Set(Array.from(a).filter(function (x) { return b.has(x); }));
    return intersection.size === a.size;
};
var fullyContainedPairs = 0;
rl.on("line", function (line) {
    var _a = line.split(",").map(range), elfA = _a[0], elfB = _a[1];
    /* That's not the right answer; your answer is too high.
    If you're stuck, make sure you're using the full input data;
    there are also some general tips on the about page, or you can ask for hints on the subreddit.
    Please wait one minute before trying again. (You guessed 632.) [Return to Day 4] */
    /* That's not the right answer; your answer is too low.
    If you're stuck, make sure you're using the full input data;
    there are also some general tips on the about page, or you can ask for hints on the subreddit.
    Please wait one minute before trying again. (You guessed 403.) [Return to Day 4] */
    if (fullyContained(elfA, elfB) || fullyContained(elfB, elfA)) {
        // console.log({ elfA, elfB, sA: elfA.size, sB: elfB.size });
        fullyContainedPairs += 1;
    }
});
rl.once("close", function () {
    console.log(fullyContainedPairs);
    // end of input
});
