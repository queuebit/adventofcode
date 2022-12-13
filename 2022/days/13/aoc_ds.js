"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var ORDER = {
    right: 1,
    wrong: -1,
    "continue": 0
};
var compare = function (a, b) {
    console.log("  - Compare ".concat(JSON.stringify(a), " vs ").concat(JSON.stringify(b)));
    if (typeof a === "number" && typeof b === "number") {
        if (a < b) {
            console.log(" .   - ".concat(a, " < ").concat(b, " - RIGHT ORDER"));
            return ORDER.right;
        }
        else if (a === b) {
            return ORDER["continue"];
        }
        else {
            console.log(" .   - ".concat(a, " > ").concat(b, " - WRONG ORDER"));
            return ORDER.wrong;
        }
    }
    else if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length === 0 && b.length > 0) {
            console.log(" .   - left is shorter - RIGHT ORDER");
            return ORDER.right;
            // } else if (b.length === 0 && a.length > 0) {
            //   console.log(` .   - right is shorter - WRONG ORDER`);
            //   return ORDER.wrong;
        }
        for (var ai = 0; ai < a.length; ai++) {
            var comp = compare(a[ai], b[ai]);
            if (b[ai] === undefined) {
                console.log(" .   - right is shorter - WRONG ORDER");
                return ORDER.wrong;
            }
            switch (comp) {
                case ORDER.right:
                    return ORDER.right;
                case ORDER.wrong:
                    return ORDER.wrong;
                case ORDER["continue"]:
                    break;
                default:
                    break;
            }
        }
        if (a.length < b.length) {
            console.log(" .   - left is shorter - RIGHT ORDER");
            return ORDER.right;
        }
    }
    else {
        if (Array.isArray(a) && !Array.isArray(b)) {
            return compare(a, [b]);
        }
        else if (!Array.isArray(a) && Array.isArray(b)) {
            return compare([a], b);
        }
        else {
            return ORDER["continue"];
        }
    }
    return ORDER["continue"];
};
var part1 = function (list) {
    var rights = [];
    for (var i = 0; i < list.length; i = i + 2) {
        var a = list[i];
        var b = list[i + 1];
        console.log("== Pair ".concat(i / 2 + 1, " =="));
        var comp = compare(a, b);
        console.log(comp);
        switch (comp) {
            case ORDER.right:
                rights.push(i / 2 + 1);
                break;
            case ORDER.wrong:
                break;
            case ORDER["continue"]:
                break;
        }
        console.log();
    }
    console.log(rights.reduce(function (a, b) { return a + b; }, 0));
    /*
    That's not the right answer; your answer is too high.
    If you're stuck, make sure you're using the full input data;
    there are also some general tips on the about page,
    or you can ask for hints on the subreddit.
    Please wait one minute before trying again. (You guessed 6644.) [Return to Day 13]
    */
    /*
    That's not the right answer; your answer is too low.
    If you're stuck, make sure you're using the full input data;
    there are also some general tips on the about page,
    or you can ask for hints on the subreddit.
    Please wait one minute before trying again. (You guessed 6281.) [Return to Day 13]
    */
};
var part2 = function () { };
var list = [];
rl.on("line", function (line) {
    if (line.length > 0) {
        list.push(JSON.parse(line.trim()));
    }
});
rl.once("close", function () {
    part1(list);
    part2();
});
