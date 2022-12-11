"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var program = [];
rl.on("line", function (line) {
    program.push(line);
});
rl.once("close", function () {
    part1();
    part2();
});
function part1() {
    console.log(program.length);
    var executable = program.map(function (line) {
        var command = line.split(" ");
        var res;
        if (command[0] === "addx") {
            res = {
                op: command[0],
                args: command.slice(1)
            };
        }
        else {
            res = {
                op: command[0],
                args: []
            };
        }
        return res;
    });
    var regX = [1];
    executable.forEach(function (r) {
        if (r.op === "noop") {
            regX.push(0);
        }
        else if (r.op === "addx") {
            regX.push(0);
            regX.push(Number(r.args[0]));
        }
    });
    console.log(regX);
    console.log(regX.slice(0, 6).reduce(function (a, b) { return a + b; }));
}
function part2() { }
