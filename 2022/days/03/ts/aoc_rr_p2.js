"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var chars = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var commonType = function (items) {
    var nItems = items.length;
    var halfItems = Math.floor(nItems / 2);
    var c1 = items.substring(0, halfItems);
    var c2 = items.substring(halfItems);
    console.log({ nItems: nItems, halfItems: halfItems, c1: c1, c2: c2 });
    var commonChar;
    Array.from(c1).every(function (c) {
        if (c2.includes(c)) {
            commonChar = c;
            return false;
        }
        else {
            return true;
        }
    });
    return commonChar;
};
var commonGroupType = function (g1, g2, g3) {
    var commonChar = "0";
    Array.from(g1).every(function (c) {
        if (g2.includes(c) && g3.includes(c)) {
            commonChar = c;
            return false;
        }
        else {
            return true;
        }
    });
    return commonChar;
};
var priorities = [];
var elfGroup = [];
rl.on("line", function (line) {
    elfGroup.push(line.trim());
    if (elfGroup.length === 3) {
        var g1 = elfGroup[0], g2 = elfGroup[1], g3 = elfGroup[2];
        var type = commonGroupType(g1, g2, g3);
        var typePriority = chars.indexOf(type);
        if (typePriority) {
            priorities.push(chars.indexOf(type));
        }
        elfGroup = [];
    }
});
rl.once("close", function () {
    console.log(priorities);
    console.log(priorities.reduce(function (a, b) { return a + b; }, 0));
    // end of input
});
