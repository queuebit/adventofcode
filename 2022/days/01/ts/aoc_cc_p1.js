"use strict";
exports.__esModule = true;
exports.main = void 0;
var readline = require("readline");
var process_1 = require("process");
var elfAppetite = function (rl) { return function (line) {
    return line;
}; };
var main = function () {
    var rl = readline.createInterface({ input: process_1.stdin, output: process_1.stdout });
    console.log("Please insert the data.");
    var cals = [];
    // reads line by line and calls someFunction(rl)(line)
    rl.on("line", function () {
        var appetite = elfAppetite()(rl);
        cals.push(appetite);
    });
};
exports.main = main;
(0, exports.main)();
