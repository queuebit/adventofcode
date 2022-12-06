"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var packetStart = function (datastream) {
    for (var c = 4; c < datastream.length; c++) {
        var window_1 = new Set(datastream.slice(c - 4, c));
        if (window_1.size === 4) {
            return c;
        }
    }
    return 0;
};
rl.on("line", function (line) {
    console.log(packetStart(line));
});
rl.once("close", function () { });
