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
    HeightMap.prototype.dijkstra = function (source, end, stopChar) {
        var _this = this;
        if (source === void 0) { source = this.start; }
        if (end === void 0) { end = this.end; }
        if (stopChar === void 0) { stopChar = ""; }
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
            q = sq.splice(1);
            var _a = uk.split("-").map(Number), ukx = _a[0], uky = _a[1];
            if (!stopChar && uk === this_1.end) {
                return { value: [dist, prev] };
            }
            else if (stopChar && this_1.map[ukx][uky] === stopChar) {
                return { value: [{ uk: dist[uk] }, {}] };
            }
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
                var nearNeighbor;
                if (stopChar) {
                    var uChar = _this.map[ukx][uky] === "E" ? "z" : _this.map[ukx][uky];
                    var uHeight = uChar.charCodeAt(0);
                    var nChar = _this.map[nx][ny] === "S" ? "a" : _this.map[nx][ny];
                    var nHeight = nChar.charCodeAt(0);
                    var diff0 = uHeight - nHeight === 0;
                    var diff1 = nHeight - uHeight === -1;
                    var diffDown = nHeight - uHeight > 0;
                    nearNeighbor = diff0 || diff1 || diffDown;
                }
                else {
                    var uChar = _this.map[ukx][uky] === "S" ? "a" : _this.map[ukx][uky];
                    var uHeight = uChar.charCodeAt(0);
                    var nChar = _this.map[nx][ny] === "E" ? "z" : _this.map[nx][ny];
                    var nHeight = nChar.charCodeAt(0);
                    var diff0 = uHeight - nHeight === 0;
                    var diff1 = uHeight - nHeight === -1;
                    var diffDown = uHeight - nHeight > 0;
                    nearNeighbor = diff0 || diff1 || diffDown;
                }
                if (q.includes(v) && nearNeighbor) {
                    alt = dist[uk] + 1;
                    // console.log({ alt, du: dist[uk], v, dv: dist[v] });
                    if (alt < dist[v]) {
                        dist[v] = alt;
                        prev[v] = uk;
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
    // hm.showMap();
    var _a = hm.dijkstra(), dist = _a[0], _ = _a[1];
    // let node = hm.end;
    // console.log();
    // console.log(`==== PATH FINDING ====`);
    // console.log(node);
    // while (prev[node]) {
    //   node = prev[node].toString();
    //   console.log(node);
    // }
    // console.log();
    console.log(dist[hm.end]);
    // https://mastodon.social/@joshburnett@fosstodon.org/109506776118491499
};
var part2 = function () {
    var start = hm.start;
    var end = hm.end;
    hm.start = end;
    hm.end = start;
    var _a = hm.dijkstra(end, start, "a"), dist = _a[0], _ = _a[1];
    console.log(Object.values(dist)[0]);
};
var hm = new HeightMap();
rl.on("line", function (line) {
    hm.addRow(Array.from(line));
});
rl.once("close", function () {
    part1();
    part2();
});
