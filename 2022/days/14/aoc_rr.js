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
        this.cavern = {};
        this.caveMap = new Set();
        this.sand = 0;
        for (var _i = 0, rockWalls_1 = rockWalls; _i < rockWalls_1.length; _i++) {
            var rockWall = rockWalls_1[_i];
            this.addRockWall(rockWall);
        }
    }
    Cave.prototype.addRockWall = function (rockWall) {
        var _this = this;
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
                        cTest = function (y) { return y <= py; };
                        nextBy = 1;
                    }
                    else {
                        cTest = function (y) { return y >= py; };
                        nextBy = -1;
                    }
                    for (var y = fy; cTest(y); y += nextBy) {
                        var n = _this.coordToString([px, y]);
                        _this.cavern[n] = "#";
                        _this.caveMap.add(n);
                    }
                }
                else if (fy === py) {
                    var cTest = void 0;
                    var nextBy = void 0;
                    if (fx < px) {
                        cTest = function (x) { return x <= px; };
                        nextBy = 1;
                    }
                    else {
                        cTest = function (x) { return x >= px; };
                        nextBy = -1;
                    }
                    for (var x = fx; cTest(x); x += nextBy) {
                        var n = _this.coordToString([x, py]);
                        _this.cavern[n] = "#";
                        _this.caveMap.add(n);
                    }
                }
            }
            from = [px, py];
        });
    };
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
    Cave.prototype.isBottom = function (id) {
        var _this = this;
        console.log("tktk - isBottom");
        var _a = this.stringToCoord(id), x = _a[0], y = _a[1];
        return (Array.from(this.caveMap).filter(function (c) {
            var _a = _this.stringToCoord(c), cx = _a[0], cy = _a[1];
            return x === cx && y < cy;
        }).length > 0);
    };
    Cave.prototype.fallLeft = function (id) {
        console.log("tktk - fallsLeft");
        var _a = this.stringToCoord(id), x = _a[0], y = _a[1];
        var left = this.coordToString([x - 1, y + 1]);
        if (this.caveMap.has(left)) {
            return false;
        }
        else {
            this.gravity(left);
            return true;
        }
    };
    Cave.prototype.fallRight = function (id) {
        console.log("tktk - fallsRight");
        var _a = this.stringToCoord(id), x = _a[0], y = _a[1];
        var right = this.coordToString([x + 1, y + 1]);
        if (this.caveMap.has(right)) {
            return false;
        }
        else {
            this.gravity(right);
            return true;
        }
    };
    Cave.prototype.fallsDown = function (id) {
        var _this = this;
        console.log("tktk - fallsDown");
        var _a = this.stringToCoord(id), x = _a[0], y = _a[1];
        return this.oneUp(Array.from(this.caveMap)
            .filter(function (c) {
            var _a = _this.stringToCoord(c), cx = _a[0], cy = _a[1];
            return x === cx && y < cy;
        })
            .sort()[0]);
    };
    Cave.prototype.gravity = function (id) {
        console.log(id);
        if (this.sand > 2000) {
            return this.sand;
        }
        if (!this.isBottom(id)) {
            return this.sand;
        }
        else if (this.caveMap.has(id)) {
            return this.sand;
        }
        else {
            var t = Date.now();
            var sits = this.fallsDown(id);
            console.log("tmtm - falldown - ".concat(Date.now() - t));
            var t2 = Date.now();
            var fl = this.fallLeft(sits);
            console.log("tmtm - fallleft - ".concat(Date.now() - t2));
            if (!fl) {
                var t3 = Date.now();
                var fr = this.fallRight(sits);
                console.log("tmtm - fallright - ".concat(Date.now() - t3));
                if (!fr) {
                    this.cavern[sits] = "o";
                    this.caveMap.add(sits);
                    this.sand++;
                }
            }
            return this.sand;
        }
    };
    Cave.prototype.maxRockDepth = function () {
        var _this = this;
        return Math.max.apply(Math, Object.keys(this.cavern)
            .filter(function (c) {
            return _this.cavern[c] === "#";
        })
            .map(function (c) { return _this.stringToCoord(c)[1]; }));
    };
    Cave.prototype.showCavern = function () {
        for (var y = 0; y < 200; y++) {
            var row = [];
            for (var x = 475; x < 575; x++) {
                var id = this.coordToString([x, y]);
                var v = this.cavern[id] || ".";
                row.push(v);
            }
            console.log(row.join(""));
        }
    };
    Cave.prototype.fill = function () {
        var fallsFrom = 500;
        var sandIn = this.sand;
        while (true) {
            var sandOut = this.gravity(this.coordToString([fallsFrom, 0]));
            if (sandOut === sandIn)
                return this.sand;
            else
                sandIn = sandOut;
        }
    };
    return Cave;
}());
var part1 = function () {
    var c = new Cave(lines);
    console.log(c.fill());
    c.showCavern();
};
var part2 = function () {
    var c = new Cave(lines);
    var maxDepth = c.maxRockDepth();
    c.addRockWall([
        [300, maxDepth + 2],
        [800, maxDepth + 2],
    ]);
    console.log(c.fill());
    c.showCavern();
    /*
    That's not the right answer; your answer is too low.
    If you're stuck, make sure you're using the full input data;
    there are also some general tips on the about page,
    or you can ask for hints on the subreddit.
    Please wait one minute before trying again. (You guessed 7438.) [Return to Day 14]
    node aoc_rr.js < puzzle1.in  1047.44s user 4.05s system 99% cpu 17:32.51 total
    https://github.com/LuisMayo/advent-of-code-2022/blob/master/src/day14/src/part1.ts
    */
};
var lines = [];
rl.on("line", function (line) {
    var points = line
        .split(" -> ")
        .map(function (p) { return p.split(",").map(Number); });
    lines.push(points);
});
rl.once("close", function () {
    part1();
    part2();
});
