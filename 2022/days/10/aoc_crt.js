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
var sum = function (a, b) { return a + b; };
var runProgram = function (program) {
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
    return regX;
};
rl.once("close", function () {
    var registers = runProgram(program);
    part1(registers);
    part2(registers);
});
function part1(regX) {
    console.log(regX);
    console.log(regX.slice(0, 6).reduce(function (a, b) { return a + b; }));
    var samples = [20, 60, 100, 140, 180, 220];
    var signalStrengths = [];
    samples.forEach(function (s) {
        var register = regX.slice(0, s).reduce(sum);
        var signalStrength = s * register;
        signalStrengths.push(signalStrength);
    });
    console.log(signalStrengths);
    console.log(signalStrengths.reduce(sum));
}
function part2(regX) {
    console.log(regX);
    var screen = [];
    regX.forEach(function (_, cycle) {
        var r = regX.slice(0, cycle + 1).reduce(sum);
        if (Math.abs(r - (cycle % 40)) <= 1) {
            screen.push("#");
        }
        else {
            screen.push(".");
        }
    });
    console.log(screen.slice(0, 40).join(""));
    console.log(screen.slice(40, 80).join(""));
    console.log(screen.slice(80, 120).join(""));
    console.log(screen.slice(120, 160).join(""));
    console.log(screen.slice(160, 200).join(""));
    console.log(screen.slice(200, 240).join(""));
}
