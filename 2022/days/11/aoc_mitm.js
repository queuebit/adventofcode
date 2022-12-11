"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var Monkey = /** @class */ (function () {
    function Monkey(name, starting, operation, testBy, trueTo, falseTo) {
        this.name = name;
        this.has = starting;
        this.operation = operation;
        this.testBy = testBy;
        this.trueTo = trueTo;
        this.falseTo = falseTo;
        this.inspections = 0;
    }
    Monkey.prototype.catchItem = function (item) {
        this.has.push(item);
    };
    Monkey.prototype.inspect = function () {
        var _this = this;
        /*
        Monkey inspects an item with a worry level of 79.
        Worry level is multiplied by 19 to 1501.
        Monkey gets bored with item. Worry level is divided by 3 to 500.
        Current worry level is not divisible by 23.
        Item with worry level 500 is thrown to monkey 3.
        */
        this.has.forEach(function (item) {
            _this.inspections += 1;
            console.log({ item: item });
            var worry = _this.operation(item);
            console.log({ worry: worry });
            worry = Math.round(worry / 3);
            console.log({ worry: worry });
            if (worry % _this.testBy === 0) {
                console.log("throw to TRUE ".concat(_this.trueTo));
            }
            else {
                console.log("throw to FALSE ".concat(_this.falseTo));
            }
        });
    };
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
        var rFunc = /old (?<op>[\+\-\/\*]{1}) (?<operand>\w+)/;
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
        console.log({ op: op, operand: operand });
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
        }
        var rTest = /divisible by (?<divisor>\d+)$/;
        var testString = notes[offset + 3].trim();
        var testMatch = testString.match(rTest);
        var testBy = testMatch && testMatch.groups ? Number(testMatch.groups.divisor) : 1;
        var trueMoveString = notes[offset + 4].trim();
        var rThrowTo = /throw to monkey (?<mk>\d+)/;
        var trueMatch = trueMoveString.match(rThrowTo);
        var trueTo = trueMatch && trueMatch.groups ? Number(trueMatch.groups.mk) : 0;
        var falseMoveString = notes[offset + 5].trim();
        var falseMatch = falseMoveString.match(rThrowTo);
        var falseTo = falseMatch && falseMatch.groups ? Number(falseMatch.groups.mk) : 0;
        return new Monkey(monkeyName, startingItems, fOperation, testBy, trueTo, falseTo);
    });
    return monkeys;
};
var part1 = function (monkeys) {
    monkeys[0].inspect();
    // const rounds = 1;
    // for (let r = 0; r < rounds; r++) {
    //   monkeys.forEach((m) => {});
    // }
};
var part2 = function () { };
var lines = [];
rl.on("line", function (line) {
    lines.push(line);
});
rl.once("close", function () {
    var monkeys = captureNotes(lines);
    console.log(monkeys);
    part1(monkeys);
    part2();
});
