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
var DIRECTION = {
    left: -1,
    up: -1,
    right: 1,
    down: 1
};
var treesInView = function (treeHeight, treeLine, direction) {
    if (treeLine.length === 0) {
        return 0;
    }
    var trees = 0;
    if (direction === DIRECTION.left || direction === DIRECTION.up) {
        for (var t = treeLine.length - 1; t >= 0; t--) {
            if (treeLine[t] >= treeHeight) {
                return trees + 1;
            }
            trees += 1;
        }
    }
    else {
        for (var t = 0; t < treeLine.length; t++) {
            if (treeLine[t] >= treeHeight) {
                return trees + 1;
            }
            trees += 1;
        }
    }
    return trees;
};
rl.on("line", function (line) {
    loadRows(line);
});
rl.once("close", function () {
    // console.log(treeRows);
    var treeCols = zip(treeRows);
    // console.log(treeCols);
    var rs = treeRows.length;
    var cs = treeCols.length;
    var inViewMap = [];
    var inViewLookup = {};
    for (var c = 0; c < cs; c++) {
        inViewMap.push([]);
        for (var r = 0; r < rs; r++) {
            var key = "".concat(c, "-").concat(r);
            if (r === 0 || c === 0 || r === rs - 1 || c === cs - 1) {
                inViewMap[c].push(0);
                inViewLookup[key] = 0;
            }
            else {
                var treeHeight = treeRows[c][r];
                var leftVals = treeRows[c].slice(0, r);
                var leftInView = treesInView(treeHeight, leftVals, DIRECTION.left);
                // console.log({ key, treeHeight, leftVals, leftInView });
                var rightVals = treeRows[c].slice(r + 1);
                var rightInView = treesInView(treeHeight, rightVals, DIRECTION.right);
                // console.log({ key, treeHeight, rightVals, rightInView });
                var upVals = treeCols[r].slice(0, c);
                var upInView = treesInView(treeHeight, upVals, DIRECTION.up);
                // console.log({ key, treeHeight, upVals, upInView });
                var downVals = treeCols[r].slice(c + 1);
                var downInView = treesInView(treeHeight, downVals, DIRECTION.down);
                // console.log({ key, treeHeight, downVals, downInView });
                inViewMap[c].push(leftInView * rightInView * upInView * downInView);
                inViewLookup[key] = leftInView * rightInView * upInView * downInView;
            }
        }
    }
    // console.log(inViewMap);
    // console.log({ rs, cs });
    // console.log(Object.keys(inViewLookup).length);
    console.log(Math.max.apply(Math, Object.values(inViewLookup)));
    /* That's not the right answer; your answer is too low.
    If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
    or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 1613.) [Return to Day 8] */
    /* That's not the right answer; your answer is too low.
    If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
    or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 1611.) [Return to Day 8] */
});
