"use strict";
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var elves = 0;
var elfDiet = 0;
var appetites = [];
rl.on("line", function (line) {
    console.log(line);
    if (line.trim() === "") {
        elves += 1;
        appetites.push(elfDiet);
        console.log("Elf #".concat(elves, " Diet: ").concat(elfDiet));
        elfDiet = 0;
    }
    else {
        elfDiet += parseInt(line.trim(), 10);
    }
});
rl.once("close", function () {
    console.log("done");
    console.log(appetites);
    console.log(Math.max.apply(Math, appetites));
    // end of input
});
