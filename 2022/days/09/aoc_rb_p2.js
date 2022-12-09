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
    "-2-1": [-1, -1],
    "22": [1, 1],
    "2-2": [1, -1],
    "-2-2": [-1, -1],
    "-22": [-1, 1]
};
var start = [0, 0];
var startKey = "0-0";
var hx = start[0], hy = start[1];
var nKnots = 9;
var knots = [];
for (var k = 1; k < nKnots; k++) {
    knots.push(start);
}
var tx = start[0], ty = start[1];
var headVisited = new Set([startKey]);
var tailVisited = new Set([startKey]);
var nearBy = function (lead, follow) {
    var lx = lead[0], ly = lead[1];
    var fx = follow[0], fy = follow[1];
    return Math.hypot(ly - fy, lx - fx) < 2;
};
var makeMoves = function (instructions) {
    instructions.forEach(function (_a) {
        var move = _a[0], count = _a[1];
        var _b = MOVES[move], dx = _b[0], dy = _b[1];
        var _loop_1 = function (i) {
            hx += dx;
            hy += dy;
            headVisited.add("".concat(hx, "-").concat(hy));
            var lead = [hx, hy];
            var newKnots = [];
            console.log({ lead: lead });
            knots.forEach(function (knot, i) {
                var kx = knot[0], ky = knot[1];
                if (!nearBy(lead, knot)) {
                    var lx = lead[0], ly = lead[1];
                    var sepx = lx - kx;
                    var sepy = ly - ky;
                    var sep = "".concat(sepx).concat(sepy);
                    console.log({ lead: lead, sep: sep, knot: knot });
                    var _a = FOLLOW_MOVE[sep], kmx = _a[0], kmy = _a[1];
                    kx += kmx;
                    ky += kmy;
                    if (i === nKnots - 1) {
                        tailVisited.add("".concat(kx, "-").concat(ky));
                    }
                }
                var newKnot = [kx, ky];
                newKnots.push(newKnot);
                lead = newKnot;
                console.log(newKnot);
            });
            knots = newKnots;
        };
        for (var i = 0; i < count; i++) {
            _loop_1(i);
        }
    });
};
rl.once("close", function () {
    makeMoves(instructions);
    console.log(tailVisited);
    console.log(tailVisited.size);
});
