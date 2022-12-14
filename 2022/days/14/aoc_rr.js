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
        this.sand = 0;
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
                            var n = _this.coordToString([px, y]);
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
                            var n = _this.coordToString([x, py]);
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
    Cave.prototype.coordToString = function (c) {
        var PAD = 9;
        var cx = c[0], cy = c[1];
        return (cx * 1e6 + cy).toString().padStart(PAD, "0");
    };
    Cave.prototype.stringToCoord = function (id) {
        var x = Math.floor(Number(id) / 1e6);
        var y = Number(id) - x * 1e6;
        return [x, y];
    };
    Cave.prototype.oneUp = function (id) {
        var _a = this.stringToCoord(id), x = _a[0], y = _a[1];
        return this.coordToString([x, y - 1]);
    };
    Cave.prototype.isBottom = function (x) {
        var XPAD = 3;
        var xStr = x.toString().padStart(XPAD, "0");
        return (Object.keys(this.cavern).filter(function (c) { return c.startsWith(xStr); }).length > 0);
    };
    Cave.prototype.fallsDown = function (x) {
        var XPAD = 3;
        var xStr = x.toString().padStart(XPAD, "0");
        return this.oneUp(Object.keys(this.cavern)
            .filter(function (c) { return c.startsWith(xStr); })
            .sort()[0]);
    };
    Cave.prototype.gravity = function (x) {
        if (!this.isBottom(x)) {
            return this.sand;
        }
        else {
            console.log(this.fallsDown(x));
            // gravity - fall down
            // block down - fall left
            // block left - fall right
            // blocked - sand++
            // falls continuously - end and return sand
            return this.sand;
        }
    };
    Cave.prototype.fill = function () {
        var fallsFrom = 500;
        var x = fallsFrom;
        while (true) {
            return this.gravity(x);
        }
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
    var c = new Cave(lines);
    console.log(c.fill());
    part1();
    part2();
});
