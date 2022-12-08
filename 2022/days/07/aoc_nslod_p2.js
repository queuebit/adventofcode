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
var wd = "";
var fs = [
    {
        name: "/",
        filetype: FILETYPES.directory,
        filesize: 0,
        parent: ""
    },
];
var fsInfo = function (d) {
    return Array.from(fs).filter(function (f) { return f.name === d; });
};
var fsChildren = function (p) {
    return Array.from(fs).filter(function (f) { return f.parent === p; });
};
var findParent = function (wd) {
    var fsParent = Array.from(fs).filter(function (f) { return f.filetype == FILETYPES.directory && f.name === wd; });
    if (fsParent.length === 0) {
        // console.log(fs.filter((f) => f.filetype === FILETYPES.directory));
        return fsParent[0].parent;
    }
    else {
        return fsParent[0].parent;
    }
};
var isInFS = function (name, filetype, parent) {
    return (Array.from(fs).filter(function (f) { return f.name === name && f.filetype === filetype && f.parent === parent; }).length > 0);
};
var parentPath = function (p) {
    if (p === "/")
        return "";
    var pathComponents = p.split("/");
    pathComponents.pop();
    console.log(pathComponents);
    if (pathComponents.length === 1 && pathComponents[0] === "") {
        return "/";
    }
    else {
        return pathComponents.join("/");
    }
};
var handleCommand = function (command) {
    // console.log(`COMMAND: ${command}`);
    if (command.startsWith("cd")) {
        var _a = command.split(" "), _ = _a[0], path = _a[1];
        activeCommand = COMMANDS.cd;
        if (path === "..") {
            wd = parentPath(wd);
        }
        else if (path === "/") {
            wd = "/";
        }
        else {
            wd += wd === "/" ? path : "/".concat(path);
        }
    }
    else if (command.startsWith("ls")) {
        activeCommand = COMMANDS.ls;
    }
};
var handleInfo = function (info) {
    // console.log(`INFO: ${info}`);
    if (activeCommand === COMMANDS.cd) {
        console.warn("SYNTAX ERROR");
    }
    else if (activeCommand === COMMANDS.ls) {
        if (info.startsWith("dir")) {
            var _a = info.split(" "), _ = _a[0], dirName = _a[1];
            if (!isInFS(dirName, FILETYPES.directory, wd)) {
                fs.push({
                    name: dirName,
                    filetype: FILETYPES.directory,
                    filesize: 0,
                    parent: wd
                });
            }
        }
        else {
            var _b = info.split(" "), strSize = _b[0], filename = _b[1];
            if (!isInFS(filename, FILETYPES.file, wd)) {
                var filesize = Number(strSize);
                fs.push({
                    name: filename,
                    filetype: FILETYPES.file,
                    filesize: filesize,
                    parent: wd
                });
            }
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
    // console.log(fsInfo("zdvj"));
    // console.log(fsChildren("zdvj"));
    console.log(ds);
    Object.keys(ds).forEach(function (d) {
        if (d === "") {
            return;
        }
        var pp = parentPath(d);
        console.log({ d: d, pp: pp });
        while (pp !== "") {
            ds[pp] += ds[d];
            pp = parentPath(pp);
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
    // console.log(JSON.stringify(fs.filter((f) => f.filetype === FILETYPES.file)));
    // console.log(
    //   JSON.stringify(fs.filter((f) => f.filetype === FILETYPES.directory))
    // );
    console.log(fs.length);
    var ds = dirSizes();
    console.log(ds);
    var smallDirs = Object.values(ds).filter(function (x) { return x < 100000; });
    console.log(smallDirs);
    console.log(smallDirs.reduce(function (a, b) { return a + b; }, 0));
    var DISK_SIZE = 70000000;
    var SPACE_NEEDED = 30000000;
    var FREE_SPACE = DISK_SIZE - ds["/"];
    console.log(FREE_SPACE > SPACE_NEEDED);
    console.log(FREE_SPACE);
    var dirOrder = Object.keys(ds).map(function (d) {
        return [d, ds[d]];
    });
    console.log(dirOrder);
    var sDirs = dirOrder.sort(function (a, b) { return a[1] - b[1]; });
    console.log(sDirs);
    var makeRoom = sDirs.filter(function (_a) {
        var name = _a[0], size = _a[1];
        return FREE_SPACE + size > SPACE_NEEDED;
    });
    console.log(makeRoom[0]);
});
