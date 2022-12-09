"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var instructions = [];
rl.on("line", function (line) {
    var _a = line.split(" "), move = _a[0], count = _a[1];
    instructions.push([move, Number(count)]);
});
var MOVES = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1]
};
var FOLLOW_MOVE = {
    "02": [0, 1],
    "20": [1, 0],
    "0-2": [0, -1],
    "-20": [-1, 0],
    "21": [1, 1],
    "12": [1, 1],
    "1-2": [1, -1],
    "2-1": [1, -1],
    "-21": [-1, 1],
    "-12": [-1, 1],
    "-1-2": [-1, -1],
    "-2-1": [-1, -1]
};
var start = [0, 0];
var startKey = "0-0";
var hx = start[0], hy = start[1];
var tx = start[0], ty = start[1];
var headVisited = new Set([startKey]);
var tailVisited = new Set([startKey]);
var nearBy = function (head, tail) {
    var hx = head[0], hy = head[1];
    var tx = tail[0], ty = tail[1];
    return Math.hypot(hy - ty, hx - tx) < 2;
};
var makeMoves = function (instructions) {
    instructions.forEach(function (_a) {
        var move = _a[0], count = _a[1];
        var _b = MOVES[move], dx = _b[0], dy = _b[1];
        for (var i = 0; i < count; i++) {
            hx += dx;
            hy += dy;
            headVisited.add("".concat(hx, "-").concat(hy));
            if (!nearBy([hx, hy], [tx, ty])) {
                var sepx = hx - tx;
                var sepy = hy - ty;
                var _c = FOLLOW_MOVE["".concat(sepx).concat(sepy)], tmx = _c[0], tmy = _c[1];
                tx += tmx;
                ty += tmy;
                tailVisited.add("".concat(tx, "-").concat(ty));
            }
        }
    });
};
rl.once("close", function () {
    makeMoves(instructions);
    console.log(tailVisited);
    console.log(tailVisited.size);
});
