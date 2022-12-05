"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var MODES = {
    crates: 0,
    stacks: 1,
    instructions: 2,
    done: 9
};
var loadCrates = function (initCrates, nStacks) {
    var stacks = [];
    // setup stacks
    for (var i = 0; i < nStacks; i++) {
        stacks.push([]);
    }
    var stackHeight = initCrates.length - 1;
    for (var cratesDown = stackHeight; cratesDown >= 0; cratesDown--) {
        for (var s = 0; s < nStacks; s++) {
            var crateIDLoc = s * 4 + 1;
            var crateID = initCrates[cratesDown].charAt(crateIDLoc);
            if (crateID.trim().length > 0) {
                stacks[s].push(crateID);
            }
        }
    }
    return stacks;
};
var craneOps = function (stacks, instructions) {
    instructions.forEach(function (instruction) {
        var regexpInstruction = /move (\d+) from (\d+) to (\d+)/;
        var match = instruction.match(regexpInstruction);
        if (match) {
            var _a = [match[1], match[2], match[3]].map(Number), nCrates = _a[0], fromStack = _a[1], toStack = _a[2];
            for (var c = 0; c < nCrates; c++) {
                var fromStackID = fromStack - 1;
                var toStackID = toStack - 1;
                var moveCrate = stacks[fromStackID].pop();
                if (moveCrate !== undefined) {
                    stacks[toStackID].push(moveCrate);
                }
            }
        }
    });
};
var topCrates = function (stacks) {
    return stacks.map(function (s) { return s.pop(); }).join("");
};
var mode = MODES.crates;
var initCrates = [];
var nStacks;
var instructions = [];
rl.on("line", function (line) {
    if (mode === MODES.crates) {
        if (line.includes("[")) {
            // capture containers
            initCrates.push(line);
            console.log("stack of containers: ".concat(line));
        }
        else {
            mode = MODES.stacks;
            // capture stacks
            nStacks = Number(line.trim().split(" ").pop());
            console.log("stack identifiers: ".concat(nStacks));
        }
    }
    else if (mode === MODES.stacks) {
        if (line.trim().length === 0) {
            mode = MODES.instructions;
            console.log("INSTRUCTIONS BLANK");
        }
        else {
            console.log("NOOP ERROR");
        }
    }
    else if (mode === MODES.instructions) {
        console.log(line);
        instructions.push(line);
    }
});
rl.once("close", function () {
    mode = MODES.done;
    console.log({ initCrates: initCrates, nStacks: nStacks, instructions: instructions });
    console.log("done", { mode: mode });
    // move string crates (by 3 char?) to string[][], stack based using stacks
    var stacks = loadCrates(initCrates, nStacks);
    console.log(stacks);
    // loop through instructions - push / pop
    craneOps(stacks, instructions);
    console.log(stacks);
    // capture top crates
    console.log(topCrates(stacks));
});
