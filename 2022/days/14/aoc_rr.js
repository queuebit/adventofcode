"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var Cave = /** @class */ (function () {
    function Cave(rockWalls) {
        var _this = this;
        this.cavern = {};
        var _loop_1 = function (rockWall) {
            var from;
            rockWall.forEach(function (_a, i) {
                var px = _a[0], py = _a[1];
                if (i === 0) {
                    from = [px, py];
                }
                else {
                    var fx = from[0], fy = from[1];
                    if (fx === px) {
                        var cTest = void 0;
                        var nextBy = void 0;
                        if (fy < py) {
                            cTest = function (y) { return y < py; };
                            nextBy = 1;
                        }
                        else {
                            cTest = function (y) { return y > py; };
                            nextBy = -1;
                        }
                        for (var y = fy; cTest(y); y += nextBy) {
                            var n = _this.coordToNumber([px, y]);
                            _this.cavern[n] = "#";
                        }
                    }
                    else if (fy === py) {
                        var cTest = void 0;
                        var nextBy = void 0;
                        if (fx < px) {
                            cTest = function (x) { return x < px; };
                            nextBy = 1;
                        }
                        else {
                            cTest = function (x) { return x > px; };
                            nextBy = -1;
                        }
                        for (var x = fx; cTest(x); x += nextBy) {
                            var n = _this.coordToNumber([x, py]);
                            _this.cavern[n] = "#";
                        }
                    }
                }
                from = [px, py];
            });
        };
        for (var _i = 0, rockWalls_1 = rockWalls; _i < rockWalls_1.length; _i++) {
            var rockWall = rockWalls_1[_i];
            _loop_1(rockWall);
        }
    }
    Cave.prototype.coordToNumber = function (c) {
        var cx = c[0], cy = c[1];
        return cx * 1e6 + cy;
    };
    return Cave;
}());
var part1 = function () { };
var part2 = function () { };
var lines = [];
rl.on("line", function (line) {
    var points = line
        .split(" -> ")
        .map(function (p) { return p.split(",").map(Number); });
    lines.push(points);
});
rl.once("close", function () {
    console.log(lines);
    var c = new Cave(lines);
    console.log(c.cavern);
    part1();
    part2();
});
