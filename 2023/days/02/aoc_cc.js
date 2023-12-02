"use strict";
exports.__esModule = true;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var getColor = function (c) {
    switch (c) {
        case "red":
            return "red";
        case "green":
            return "green";
        case "blue":
            return "blue";
        default:
            return "red";
    }
};
var Game = /** @class */ (function () {
    function Game(desc) {
        this.gameId = 0;
        this.rounds = [];
        var match = desc.match(/Game (?<gameId>\d+): (?<rounds>.+)/);
        if (match) {
            var groups = match.groups;
            this.gameId = Number(groups === null || groups === void 0 ? void 0 : groups.gameId);
            this.rounds = ((groups === null || groups === void 0 ? void 0 : groups.rounds) || "").split("; ").map(function (r) {
                var round = { red: 0, green: 0, blue: 0 };
                r.split(", ").forEach(function (c) {
                    var cMatch = c.match(/(?<count>\d+) (?<color>(red|blue|green))/);
                    if (cMatch) {
                        var cGroups = cMatch.groups;
                        var color = getColor(cGroups === null || cGroups === void 0 ? void 0 : cGroups.color);
                        var count = Number((cGroups === null || cGroups === void 0 ? void 0 : cGroups.count) || 0);
                        round[color] = count;
                    }
                });
                console.log(round);
                return round;
            });
        }
    }
    return Game;
}());
var part1 = function (games) {
    var scenario = { red: 12, green: 13, blue: 14 };
    var possibleGames = games.filter(function (g) {
        return g.rounds.every(function (r) {
            return r.green <= scenario.green &&
                r.blue <= scenario.blue &&
                r.red <= scenario.red;
        });
    });
    console.log(possibleGames);
    console.log(possibleGames.reduce(function (acc, g) { return acc + g.gameId; }, 0));
};
var part2 = function (games) {
    var power = games.map(function (g) {
        var reds = [];
        var greens = [];
        var blues = [];
        g.rounds.forEach(function (r) {
            reds.push(r.red);
            blues.push(r.blue);
            greens.push(r.green);
        });
        return Math.max.apply(Math, reds) * Math.max.apply(Math, greens) * Math.max.apply(Math, blues);
    });
    console.log(power.reduce(function (acc, n) { return acc + n; }, 0));
};
var games = [];
rl.on("line", function (line) {
    console.log(line);
    games.push(new Game(line));
});
rl.once("close", function () {
    part1(games);
    // 2751 - too high
    part2(games);
});
