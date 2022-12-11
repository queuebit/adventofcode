"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var Monkey = /** @class */ (function () {
    function Monkey(name, starting, operation, test) {
        this.name = name;
        this.has = starting;
        this.operation = operation;
        this.test = test;
        this.inspections = 0;
    }
    return Monkey;
}());
var captureNotes = function (notes) {
    var monkeys = new Array(Math.ceil(notes.length / 7))
        .fill(0)
        .map(function (_, i) {
        var offset = 7 * i;
        var rMonkey = /^Monkey (?<name>\d+):$/;
        var nameMatch = notes[offset].match(rMonkey);
        var monkeyName = nameMatch && nameMatch.groups && nameMatch.groups.name
            ? Number(nameMatch.groups.name)
            : 999;
        var itemString = notes[offset + 1].substring(17).trim();
        var startingItems = itemString.split(", ").map(Number);
        var fOperation = function (x) { return x; };
        var opString = notes[offset + 2].substring(19).trim();
        var rOld = /old/g;
        var rFunc = /^old (?<op>\+\/*\-) (?<operand>\w+)$/;
        var funcMatch = opString.match(rFunc);
        var op = "noop";
        var operand = 0;
        if (funcMatch && funcMatch.groups) {
            op = funcMatch.groups.op || "noop";
            operand =
                funcMatch.groups.operand === "old"
                    ? 1
                    : Number(funcMatch.groups.operand);
        }
        if ((opString.match(rOld) || []).length > 1) {
            switch (op) {
                case "+":
                case "-":
                    fOperation = function (x) { return 2 * x; };
                    break;
                case "/":
                    fOperation = function (x) { return 1; };
                    break;
                case "*":
                    fOperation = function (x) { return Math.pow(x, 2); };
                    break;
                default:
                    fOperation = function (x) { return x; };
                    break;
            }
            fOperation = function (x) { return x; };
        }
        else {
            switch (op) {
                case "+":
                    fOperation = function (x) { return x + operand; };
                    break;
                case "-":
                    fOperation = function (x) { return x - operand; };
                    break;
                case "/":
                    fOperation = function (x) { return x / operand; };
                    break;
                case "*":
                    fOperation = function (x) { return x * operand; };
                    break;
                default:
                    fOperation = function (x) { return x; };
                    break;
            }
            console.log("Single OLD: ".concat(opString));
        }
        return new Monkey(monkeyName, startingItems, fOperation, function (x) { });
    });
    return monkeys;
};
var part1 = function () { };
var part2 = function () { };
var lines = [];
rl.on("line", function (line) {
    lines.push(line);
});
rl.once("close", function () {
    var monkeys = captureNotes(lines);
    console.log(monkeys);
    part1();
    part2();
});
