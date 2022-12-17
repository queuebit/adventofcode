"use strict";
var parse = require("path").parse;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var part1 = function (sensors) {
    // find xy area covered by sensors and beacons
    var area = { minX: 0, minY: 0, maxX: 1, maxY: 1 };
    for (var _i = 0, sensors_1 = sensors; _i < sensors_1.length; _i++) {
        var sensor = sensors_1[_i];
        var sensorMinX = Math.min(sensor.location.x, sensor.beacon.x);
        var sensorMinY = Math.min(sensor.location.y, sensor.beacon.y);
        var sensorMaxX = Math.max(sensor.location.x, sensor.beacon.x);
        var sensorMaxY = Math.max(sensor.location.y, sensor.beacon.y);
        if (sensorMinX < area.minX) {
            area.minX = sensorMinX;
        }
        if (sensorMinY < area.minY) {
            area.minY = sensorMinY;
        }
        if (sensorMaxX > area.maxX) {
            area.maxX = sensorMaxX;
        }
        if (sensorMaxY > area.maxY) {
            area.maxY = sensorMaxY;
        }
    }
    var KEY_ROW = 2000000;
    // const KEY_ROW = 10;
    var knownNots = new Set();
    for (var _a = 0, sensors_2 = sensors; _a < sensors_2.length; _a++) {
        var sensor = sensors_2[_a];
        var dy = Math.abs(KEY_ROW - sensor.location.y);
        if (dy <= sensor.manhattan) {
            var possible = { x: sensor.location.x, y: KEY_ROW };
            knownNots.add("".concat(possible.x, ",").concat(possible.y));
            for (var dx = 1; dx <= sensor.manhattan - Math.abs(dy); dx++) {
                var possiblePlus = { x: sensor.location.x + dx, y: KEY_ROW };
                var possibleMinus = { x: sensor.location.x - dx, y: KEY_ROW };
                knownNots.add("".concat(possiblePlus.x, ",").concat(possiblePlus.y));
                knownNots.add("".concat(possibleMinus.x, ",").concat(possibleMinus.y));
            }
        }
        // beacon
        if (sensor.beacon.y === KEY_ROW)
            knownNots["delete"]("".concat(sensor.beacon.x, ",").concat(sensor.beacon.y));
    }
    console.log(knownNots.size);
};
var part2 = function (sensors) {
    // const area = {
    //   xMin: 0,
    //   xMax: 20,
    //   yMin: 0,
    //   yMax: 20,
    // };
    var area = {
        xMin: 0,
        xMax: 4000000,
        yMin: 0,
        yMax: 4000000
    };
    for (var x = area.xMin; x <= area.xMax; x++) {
        var _loop_1 = function (y) {
            var possible = { x: x, y: y };
            if (sensors.every(function (s) {
                return s.notNearX(possible) &&
                    s.notNearY(possible) &&
                    !s.manhattanNear(possible);
            }))
                return { value: possible };
        };
        for (var y = area.yMin; y <= area.yMax; y++) {
            var state_1 = _loop_1(y);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    return { x: 0, y: 0 };
};
var Sensor = /** @class */ (function () {
    function Sensor(location, beacon) {
        this.location = location;
        this.beacon = beacon;
        var dx = Math.abs(location.x - beacon.x);
        var dy = Math.abs(location.y - beacon.y);
        this.manhattan = dx + dy;
    }
    Sensor.prototype.notNearX = function (p) {
        var dx = Math.abs(this.location.x - p.x);
        return dx > this.manhattan;
    };
    Sensor.prototype.notNearY = function (p) {
        var dy = Math.abs(this.location.y - p.y);
        return dy > this.manhattan;
    };
    Sensor.prototype.manhattanNear = function (p) {
        var dx = Math.abs(this.location.x - p.x);
        var dy = Math.abs(this.location.y - p.y);
        return dx + dy <= this.manhattan;
    };
    return Sensor;
}());
var sensorArray = [];
rl.on("line", function (line) {
    var rSensor = /Sensor at x=(?<sx>\-?\d+), y=(?<sy>\-?\d+): closest beacon is at x=(?<bx>\-?\d+), y=(?<by>\-?\d+)/;
    var match = line.match(rSensor);
    if (match && match.groups) {
        var l = {
            x: Number(match.groups.sx || "0"),
            y: Number(match.groups.sy || "0")
        };
        var b = {
            x: Number(match.groups.bx || "0"),
            y: Number(match.groups.by || "0")
        };
        var s = new Sensor(l, b);
        sensorArray.push(s);
    }
    else {
        console.log(line);
    }
});
rl.once("close", function () {
    part1(sensorArray);
    var b = part2(sensorArray);
    console.log(b);
    console.log(b.x * 4000000 + b.y);
});
