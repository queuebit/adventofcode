"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var treeRows = [];
var loadRows = function (line) {
    treeRows.push(line.split("").map(Number));
};
var zip = function (arr) {
    return arr.map(function (_, i) {
        return arr.map(function (row) {
            return row[i];
        });
    });
};
rl.on("line", function (line) {
    loadRows(line);
});
rl.once("close", function () {
    console.log(treeRows);
    var treeCols = zip(treeRows);
    console.log(treeCols);
    var rs = treeRows.length;
    var cs = treeCols.length;
    var inViewMap = {};
    for (var r = 0; r < rs; r++) {
        var _loop_1 = function (c) {
            var key = "".concat(r).concat(c);
            if (r === 0 || c === 0 || r === rs - 1 || c === cs - 1) {
                inViewMap[key] = true;
            }
            var treeHeight = treeRows[c][r];
            var leftView = !(treeRows[c].slice(0, r).filter(function (t) { return t >= treeHeight; }).length > 0);
            var rightView = !(treeRows[c].slice(r + 1).filter(function (t) { return t >= treeHeight; }).length > 0);
            var upView = !(treeCols[r].slice(0, c).filter(function (t) { return t >= treeHeight; }).length > 0);
            var downView = !(treeCols[r].slice(c + 1).filter(function (t) { return t >= treeHeight; }).length > 0);
            inViewMap[key] = leftView || rightView || upView || downView;
        };
        for (var c = 0; c < cs; c++) {
            _loop_1(c);
        }
    }
    console.log(inViewMap);
    console.log(Object.values(inViewMap).filter(function (viewable) { return viewable; }).length);
});
