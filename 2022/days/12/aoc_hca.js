"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var HeightMap = /** @class */ (function () {
    function HeightMap() {
        this.map = [];
        this.start = "0-0";
        this.end = "0-0";
    }
    HeightMap.prototype.addRow = function (row) {
        this.map.push(row);
        var currentRow = this.map.length - 1;
        if (row.includes("S")) {
            this.start = "".concat(currentRow, "-").concat(row.indexOf("S"));
        }
        if (row.includes("E")) {
            this.end = "".concat(currentRow, "-").concat(row.indexOf("E"));
        }
    };
    HeightMap.prototype.showMap = function () {
        for (var r = 0; r < this.map.length; r++) {
            console.log(this.map[r].join("|"));
        }
    };
    HeightMap.prototype.dijkstra = function (source) {
        var _this = this;
        if (source === void 0) { source = this.start; }
        var q = [];
        var dist = {};
        var prev = {};
        var NNN = 999999;
        var height = this.map.length;
        var width = this.map[0].length;
        for (var r = 0; r < height; r++) {
            for (var c = 0; c < width; c++) {
                var v = "".concat(r, "-").concat(c);
                dist[v] = NNN;
                prev[v] = "undefined";
                q.push(v);
            }
        }
        dist[source] = 0;
        var _loop_1 = function () {
            var sq = q.sort(function (a, b) {
                return dist[a] - dist[b];
            });
            var uk = sq[0];
            console.log(uk);
            q = sq.splice(1);
            var _a = uk.split("-").map(Number), ukx = _a[0], uky = _a[1];
            var neighbors = [];
            if (ukx === 0) {
                neighbors.push("".concat(ukx + 1, "-").concat(uky));
            }
            else if (ukx === height - 1) {
                neighbors.push("".concat(ukx - 1, "-").concat(uky));
            }
            else {
                neighbors.push("".concat(ukx + 1, "-").concat(uky));
                neighbors.push("".concat(ukx - 1, "-").concat(uky));
            }
            if (uky === 0) {
                neighbors.push("".concat(ukx, "-").concat(uky + 1));
            }
            else if (uky === width - 1) {
                neighbors.push("".concat(ukx, "-").concat(uky - 1));
            }
            else {
                neighbors.push("".concat(ukx, "-").concat(uky - 1));
                neighbors.push("".concat(ukx, "-").concat(uky + 1));
            }
            neighbors.forEach(function (v) {
                var alt;
                var _a = v.split("-").map(Number), nx = _a[0], ny = _a[1];
                var uChar = _this.map[ukx][uky];
                var uHeight = uChar.charCodeAt(0);
                var nChar = _this.map[nx][ny];
                var nHeight = nChar.charCodeAt(0);
                var diff0 = uHeight - nHeight === 0;
                var diff1 = uHeight - nHeight === -1;
                var diffSa = uk === _this.start && nChar === "a";
                var diffzE = uChar === "z" && v === _this.end;
                var nearNeighbor = diff0 || diff1 || diffSa || diffzE;
                if (v === "29-131") {
                    console.log("TKTK");
                    console.log({
                        q: q,
                        uk: uk,
                        v: v,
                        uChar: uChar,
                        nChar: nChar,
                        diff0: diff0,
                        diff1: diff1,
                        diffSa: diffSa,
                        diffzE: diffzE,
                        nearNeighbor: nearNeighbor,
                        inList: q.includes(v)
                    });
                }
                // uk to n is same character
                // uk to n is single character
                // uk is S and n is a
                // uk is z and n is z
                if (q.includes(v) && nearNeighbor) {
                    alt = dist[uk] + 1;
                    console.log({ alt: alt, uk: uk, v: v });
                    if (alt < dist[v]) {
                        dist[v] = alt;
                        prev[v] = uk;
                    }
                }
            });
        };
        while (q.length > 0) {
            _loop_1();
        }
        return [dist, prev];
    };
    return HeightMap;
}());
var part1 = function () {
    hm.showMap();
    var _a = hm.dijkstra(), dist = _a[0], prev = _a[1];
    // let node = "32-148"; // e
    // let node = "34-140"; // l
    var node = "28-131"; // l
    console.log();
    console.log("==== PATH FINDING ====");
    console.log(node);
    while (prev[node]) {
        node = prev[node] !== 999999 ? prev[node] : "S";
        console.log(node);
    }
    console.log();
    console.log(dist[hm.end]);
    /*
    That's not the right answer; your answer is too low.
    If you're stuck, make sure you're using the full input data;
    there are also some general tips on the about page,
    or you can ask for hints on the subreddit.
    Please wait one minute before trying again. (You guessed 257.) [Return to Day 12]
    */
    // https://mastodon.social/@joshburnett@fosstodon.org/109506776118491499
};
var part2 = function () { };
var hm = new HeightMap();
rl.on("line", function (line) {
    hm.addRow(Array.from(line));
});
rl.once("close", function () {
    part1();
    part2();
});
