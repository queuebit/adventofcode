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
        else if (row.includes("E")) {
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
        var NNN = 999;
        var height = this.map.length;
        var width = this.map[0].length;
        for (var r = 0; r < height; r++) {
            for (var c = 0; c < width; c++) {
                var v = "".concat(r, "-").concat(c);
                dist[v] = NNN;
                prev[v] = "undefined";
                q.push([v, dist[v]]);
            }
        }
        dist[source] = 0;
        var _loop_1 = function () {
            var sq = q.sort(function (a, b) { return a[1] - b[1]; });
            var _a = sq[0], uk = _a[0], _ = _a[1];
            if (uk === this_1.end) {
                return { value: [dist, prev] };
            }
            q = sq.splice(1);
            var _b = uk.split("-").map(Number), ukx = _b[0], uky = _b[1];
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
            neighbors.forEach(function (n) {
                var qks = q.map(function (qi) { return qi[0]; });
                var alt;
                var _a = n.split("-").map(Number), nx = _a[0], ny = _a[1];
                var diff0 = _this.map[ukx][uky].charCodeAt(0) - _this.map[nx][ny].charCodeAt(0) ===
                    0;
                var diff1 = _this.map[ukx][uky].charCodeAt(0) - _this.map[nx][ny].charCodeAt(0) ===
                    -1;
                var diffSa = uk === _this.start && _this.map[nx][ny] === "a";
                var diffzE = uk === "z" && n === _this.end;
                var nearNeighbor = diff0 || diff1 || diffSa || diffzE;
                // uk to n is same character
                // uk to n is single character
                // uk is S and n is a
                // uk is z and n is z
                if (qks.includes(n) && nearNeighbor) {
                    alt = dist[uk] + 1;
                    if (alt < dist[n]) {
                        dist[n] = alt;
                        prev[n] = uk;
                    }
                }
            });
        };
        var this_1 = this;
        while (q.length > 0) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return [dist, prev];
    };
    return HeightMap;
}());
var part1 = function () {
    hm.showMap();
    console.log(hm.dijkstra());
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
