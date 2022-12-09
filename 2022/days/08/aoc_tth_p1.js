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
    var inViewMap = [];
    var inViewLookup = {};
    for (var c = 0; c < cs; c++) {
        inViewMap.push([]);
        var _loop_1 = function (r) {
            var key = "".concat(c).concat(r);
            if (r === 0 || c === 0 || r === rs - 1 || c === cs - 1) {
                inViewMap[c].push(true);
                inViewLookup[key] = true;
            }
            else {
                var treeHeight_1 = treeRows[c][r];
                var leftVals = treeRows[c].slice(0, r);
                var leftView = leftVals.filter(function (t) { return t >= treeHeight_1; }).length === 0;
                // console.log({ key, treeHeight, leftVals, leftView });
                var rightVals = treeRows[c].slice(r + 1);
                var rightView = rightVals.filter(function (t) { return t >= treeHeight_1; }).length === 0;
                // console.log({ key, treeHeight, rightVals, rightView });
                var upVals = treeCols[r].slice(0, c);
                var upView = upVals.filter(function (t) { return t >= treeHeight_1; }).length === 0;
                // console.log({ key, treeHeight, upVals, upView });
                var downVals = treeCols[r].slice(c + 1);
                var downView = downVals.filter(function (t) { return t >= treeHeight_1; }).length === 0;
                // console.log({ key, treeHeight, downVals, downView });
                inViewMap[c].push(leftView || rightView || upView || downView);
                inViewLookup[key] = leftView || rightView || upView || downView;
            }
        };
        for (var r = 0; r < rs; r++) {
            _loop_1(r);
        }
    }
    console.log(inViewMap);
    console.log({ rs: rs, cs: cs });
    console.log(Object.values(inViewLookup).filter(function (viewable) { return viewable; }).length);
    /* That's not the right answer; your answer is too low.
    If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
    or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 1613.) [Return to Day 8] */
    /* That's not the right answer; your answer is too low.
    If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
    or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 1611.) [Return to Day 8] */
});
