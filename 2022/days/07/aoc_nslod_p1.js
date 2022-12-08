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
var fs = [
    { name: "/", filetype: FILETYPES.directory, filesize: 0, parent: "" },
];
var handleCommand = function (command) {
    console.log("COMMAND: ".concat(command));
    if (command.startsWith("cd")) {
        var _a = command.split(" "), _ = _a[0], path = _a[1];
        wd = path;
        activeCommand = COMMANDS.cd;
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
            fs.push({
                name: dirName,
                filetype: FILETYPES.directory,
                filesize: 0,
                parent: wd
            });
        }
        else {
            var _b = info.split(" "), strSize = _b[0], filename = _b[1];
            var filesize = Number(strSize);
            fs.push({
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
    fs.reduceRight(function (prev, cur) {
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
        var fsd = fs.filter(function (f) { return f.filetype == FILETYPES.directory && f.name === d; })[0];
        while (fsd.parent !== "") {
            ds[fsd.parent] += ds[d];
            fsd = fs.filter(function (f) { return f.filetype == FILETYPES.directory && f.name === fsd.parent; })[0];
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
    console.log(fs);
    var ds = dirSizes();
    console.log(ds);
    var smallDirs = Object.values(ds).filter(function (x) { return x < 100000; });
    console.log(smallDirs.reduce(function (a, b) { return a + b; }, 0));
});
