"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var packetDecode = function (datastream, decodeN) {
    for (var c = decodeN; c < datastream.length; c++) {
        var window_1 = new Set(datastream.slice(c - decodeN, c));
        if (window_1.size === decodeN) {
            return c;
        }
    }
    return 0;
};
rl.on("line", function (line) {
    console.log({
        packetStart: packetDecode(line, 4),
        messageStart: packetDecode(line, 14)
    });
});
rl.once("close", function () { });
