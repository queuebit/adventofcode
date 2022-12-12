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
        this.start = [0, 0];
        this.end = [0, 0];
    }
    HeightMap.prototype.addRow = function (row) {
        this.map.push(row);
        var currentRow = this.map.length - 1;
        if (row.includes("S")) {
            this.start = [currentRow, row.indexOf("S")];
        }
        else if (row.includes("E")) {
            this.end = [currentRow, row.indexOf("E")];
        }
    };
    HeightMap.prototype.showMap = function () {
        for (var r = 0; r < this.map.length; r++) {
            console.log(this.map[r].join("|"));
        }
    };
    return HeightMap;
}());
var part1 = function () {
    hm.showMap();
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
