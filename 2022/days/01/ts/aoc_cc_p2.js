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
var elfCount = function () {
    elves += 1;
    appetites.push(elfDiet);
    console.log("Elf #".concat(elves, " Diet: ").concat(elfDiet));
    elfDiet = 0;
};
rl.on("line", function (line) {
    if (line.trim() === "") {
        console.log(line);
        elfCount();
    }
    else {
        elfDiet += parseInt(line.trim(), 10);
    }
});
rl.once("close", function () {
    elfCount();
    console.log("done");
    console.log(appetites);
    var bigAppetiteElves = appetites.sort(function (a, b) { return b - a; });
    console.log(bigAppetiteElves);
    var bigThree = bigAppetiteElves.slice(0, 3);
    var threeTotal = bigThree.reduce(function (a, b) { return a + b; }, 0);
    console.log(bigThree);
    console.log(threeTotal);
    // end of input
});
