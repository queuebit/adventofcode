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
            console.log(q.length);
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
            console.log({ neighbors: neighbors });
            neighbors.forEach(function (n) {
                var qks = q.map(function (qi) { return qi[0]; });
                var alt;
                var _a = n.split("-").map(Number), nx = _a[0], ny = _a[1];
                var uChar = _this.map[ukx][uky];
                var uHeight = uChar.charCodeAt(0);
                var nChar = _this.map[nx][ny];
                var nHeight = nChar.charCodeAt(0);
                var diff0 = uHeight - nHeight === 0;
                var diff1 = Math.abs(uHeight - nHeight) === 1;
                var diffSa = uk === _this.start && nChar === "a";
                var diffzE = uChar === "z" && n === _this.end;
                var nearNeighbor = diff0 || diff1 || diffSa || diffzE;
                if (n === "3-7") {
                    console.log({
                        q: q,
                        qks: qks,
                        n: n,
                        uChar: uChar,
                        nChar: nChar,
                        diff0: diff0,
                        diff1: diff1,
                        diffSa: diffSa,
                        diffzE: diffzE,
                        nearNeighbor: nearNeighbor,
                        inList: qks.includes(n)
                    });
                }
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
        while (q.length > 0) {
            _loop_1();
        }
        return [dist, prev];
    };
    return HeightMap;
}());
var part1 = function () {
    hm.showMap();
    // hm.dijkstra();
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
