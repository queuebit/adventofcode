"use strict";
exports.__esModule = true;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var ReadMode;
(function (ReadMode) {
    ReadMode[ReadMode["Seeds"] = 0] = "Seeds";
    ReadMode[ReadMode["MapType"] = 1] = "MapType";
    ReadMode[ReadMode["Transform"] = 2] = "Transform";
})(ReadMode || (ReadMode = {}));
var Delta;
(function (Delta) {
    Delta[Delta["Op"] = 0] = "Op";
    Delta[Delta["NoOp"] = 1] = "NoOp";
})(Delta || (Delta = {}));
var seeds = [];
var transforms = [];
var from = "";
var to = "";
var parseInstructions = function (line) {
    var _a;
    switch (mode) {
        case ReadMode.Seeds:
            if (line === "") {
                mode = ReadMode.MapType;
            }
            else {
                seeds = line.split(":")[1].trim().split(" ").map(Number);
            }
            break;
        case ReadMode.MapType:
            _a = line.split(" ")[0].split("-to-"), from = _a[0], to = _a[1];
            mode = ReadMode.Transform;
            break;
        case ReadMode.Transform:
            if (line === "") {
                mode = ReadMode.MapType;
            }
            else {
                var _b = line.split(" ").map(Number).slice(0, 3), t_1 = _b[0], i_1 = _b[1], f_1 = _b[2];
                transforms.push({
                    from: from,
                    to: to,
                    func: function (input) {
                        if (input < i_1 || input > i_1 + f_1) {
                            return { value: input, op: Delta.NoOp };
                        }
                        else {
                            return { value: t_1 + (input - i_1), op: Delta.Op };
                        }
                    }
                });
            }
            break;
        default:
            break;
    }
};
var part1 = function () {
    var locations = seeds.map(function (s) {
        var v = s;
        var lifecycles = [
            "seed",
            "soil",
            "fertilizer",
            "water",
            "light",
            "temperature",
            "humidity",
            "location",
        ];
        var _loop_1 = function (l) {
            var ts = transforms.filter(function (t) { return t.from === lifecycles[l]; });
            for (var _i = 0, ts_1 = ts; _i < ts_1.length; _i++) {
                var t = ts_1[_i];
                var result = t.func(v);
                if (result.op === Delta.Op) {
                    v = result.value;
                    console.log("op", result, t.from, "-to-", t.to);
                    break;
                }
                console.log("noop", result, t.from, "-to-", t.to);
            }
        };
        for (var l = 0; l < lifecycles.length; l++) {
            _loop_1(l);
        }
        return v;
    });
    console.log({ locations: locations });
    console.log(Math.min.apply(Math, locations));
};
var part2 = function () { };
var mode = ReadMode.Seeds;
rl.on("line", function (line) {
    parseInstructions(line.trim());
});
rl.once("close", function () {
    console.log(seeds, transforms);
    part1();
    part2();
});
