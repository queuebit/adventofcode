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
    // establish possible points
    // let possibilities = new Set<string>();
    // for (let x = area.minX; x <= area.maxX; x++) {
    //   for (let y = area.minY; y <= area.maxY; y++) {
    //     possibilities.add(`${x}-${y}`);
    //   }
    // }
    // const possiblePossibiles = possibilities.size;
    // remove based on sensor knowledge
    var KEY_ROW = 10;
    var knownNots = new Set();
    for (var _a = 0, sensors_2 = sensors; _a < sensors_2.length; _a++) {
        var sensor = sensors_2[_a];
        // location
        if (sensor.location.y === KEY_ROW)
            knownNots.add("".concat(sensor.location.x, "-").concat(sensor.location.y));
        // beacon
        if (sensor.beacon.y === KEY_ROW)
            knownNots.add("".concat(sensor.beacon.x, "-").concat(sensor.beacon.y));
        // spaces manhattan from beacon
        for (var dx = -sensor.manhattan + 1; dx < sensor.manhattan; dx++) {
            if (sensor.location.x + dx < -2) {
                console.log(sensor);
            }
            if (sensor.location.y === KEY_ROW)
                knownNots.add("".concat(sensor.location.x + dx, "-").concat(sensor.location.y));
            for (var dy = 0; dy <= Math.abs(sensor.manhattan - dx); dy++) {
                if (sensor.location.y + dy === KEY_ROW) {
                    knownNots.add("".concat(sensor.location.x + dx, "-").concat(sensor.location.y + dy));
                }
                if (sensor.location.y - dy === KEY_ROW) {
                    knownNots.add("".concat(sensor.location.x + dx, "-").concat(sensor.location.y - dy));
                }
            }
        }
    }
    console.log(Array.from(knownNots).sort());
    console.log(knownNots.size);
};
var part2 = function () { };
var Sensor = /** @class */ (function () {
    function Sensor(location, beacon) {
        this.location = location;
        this.beacon = beacon;
        var dx = Math.abs(location.x - beacon.x);
        var dy = Math.abs(location.y - beacon.y);
        this.manhattan = dx + dy;
    }
    return Sensor;
}());
var sensorArray = [];
rl.on("line", function (line) {
    var rSensor = /Sensor at x=(?<sx>\d+), y=(?<sy>\d+): closest beacon is at x=(?<bx>\d+), y=(?<by>\d+)/;
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
});
rl.once("close", function () {
    part1(sensorArray);
    part2();
});
