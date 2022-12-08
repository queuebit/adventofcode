"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var COMMANDS = {
    cd: 0,
    ls: 1,
    noop: 99
};
var FILETYPES = {
    directory: 0,
    file: 1
};
var activeCommand = COMMANDS.noop;
var wd = "?";
var fs = new Set([
    { name: "/", filetype: FILETYPES.directory, filesize: 0, parent: "" },
]);
var findParent = function (wd) {
    return Array.from(fs).filter(function (f) { return f.filetype == FILETYPES.directory && f.name === wd; })[0].parent;
};
var handleCommand = function (command) {
    console.log("COMMAND: ".concat(command));
    if (command.startsWith("cd")) {
        var _a = command.split(" "), _ = _a[0], path = _a[1];
        activeCommand = COMMANDS.cd;
        if (path === "..") {
            wd = findParent(wd);
            console.log(".. PARENT IS: ".concat(wd));
        }
        else {
            wd = path;
        }
    }
    else if (command.startsWith("ls")) {
        activeCommand = COMMANDS.ls;
    }
};
var handleInfo = function (info) {
    console.log("INFO: ".concat(info));
    if (activeCommand === COMMANDS.cd) {
        console.warn("SYNTAX ERROR");
    }
    else if (activeCommand === COMMANDS.ls) {
        if (info.startsWith("dir")) {
            var _a = info.split(" "), _ = _a[0], dirName = _a[1];
            fs.add({
                name: dirName,
                filetype: FILETYPES.directory,
                filesize: 0,
                parent: wd
            });
        }
        else {
            var _b = info.split(" "), strSize = _b[0], filename = _b[1];
            var filesize = Number(strSize);
            fs.add({
                name: filename,
                filetype: FILETYPES.file,
                filesize: filesize,
                parent: wd
            });
        }
    }
};
var dirSizes = function () {
    var ds = {};
    // handle files
    Array.from(fs).reduce(function (prev, cur) {
        if (!Object.keys(prev).includes(cur.parent)) {
            prev[cur.parent] = 0;
        }
        prev[cur.parent] += cur.filesize;
        return prev;
    }, ds);
    // handle subdirectories
    Object.keys(ds).forEach(function (d) {
        if (d === "") {
            return;
        }
        var fsd = Array.from(fs).filter(function (f) { return f.filetype == FILETYPES.directory && f.name === d; })[0];
        while (fsd.parent !== "") {
            ds[fsd.parent] += ds[d];
            fsd = Array.from(fs).filter(function (f) { return f.filetype == FILETYPES.directory && f.name === fsd.parent; })[0];
        }
    });
    return ds;
};
rl.on("line", function (line) {
    if (line.startsWith("$ ")) {
        handleCommand(line.slice(2));
    }
    else {
        handleInfo(line);
    }
});
rl.once("close", function () {
    // console.log(fs);
    console.log(fs.size);
    var ds = dirSizes();
    // console.log(ds);
    var smallDirs = Object.values(ds).filter(function (x) { return x < 100000; });
    console.log(smallDirs.reduce(function (a, b) { return a + b; }, 0));
    /* That's not the right answer; your answer is too low.
    If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
    or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 774391.) */
});
