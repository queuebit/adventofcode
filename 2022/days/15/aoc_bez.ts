const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const part1 = (sensors: Sensor[]) => {
  // find xy area covered by sensors and beacons
  let area = { minX: 0, minY: 0, maxX: 1, maxY: 1 };
  for (const sensor of sensors) {
    const sensorMinX = Math.min(sensor.location.x, sensor.beacon.x);
    const sensorMinY = Math.min(sensor.location.y, sensor.beacon.y);
    const sensorMaxX = Math.max(sensor.location.x, sensor.beacon.x);
    const sensorMaxY = Math.max(sensor.location.y, sensor.beacon.y);

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

  const KEY_ROW = 2000000;
  // const KEY_ROW = 10;
  let knownNots = new Set<string>();
  for (const sensor of sensors) {
    const dy = Math.abs(KEY_ROW - sensor.location.y);
    if (dy <= sensor.manhattan) {
      const possible = { x: sensor.location.x, y: KEY_ROW };
      knownNots.add(`${possible.x},${possible.y}`);
      for (let dx = 1; dx <= sensor.manhattan - Math.abs(dy); dx++) {
        const possiblePlus = { x: sensor.location.x + dx, y: KEY_ROW };
        const possibleMinus = { x: sensor.location.x - dx, y: KEY_ROW };
        knownNots.add(`${possiblePlus.x},${possiblePlus.y}`);
        knownNots.add(`${possibleMinus.x},${possibleMinus.y}`);
      }
    }

    // beacon
    if (sensor.beacon.y === KEY_ROW)
      knownNots.delete(`${sensor.beacon.x},${sensor.beacon.y}`);
  }
  console.log(knownNots.size);

  // % time node aoc_bez.js < puzzle.in
  // node aoc_bez.js < puzzle.in  1974.82s user 4.32s system 99% cpu 33:03.10 total
  // That's not the right answer; your answer is too low. (You guessed 3447420.) [Return to Day 15]
  // That's not the right answer; your answer is too low. (You guessed 3866028.) [Return to Day 15]
};
const part2 = () => {};

type Coord = { x: number; y: number };
class Sensor {
  manhattan: number;
  location: Coord;
  beacon: Coord;
  constructor(location: Coord, beacon: Coord) {
    this.location = location;
    this.beacon = beacon;
    const dx = Math.abs(location.x - beacon.x);
    const dy = Math.abs(location.y - beacon.y);
    this.manhattan = dx + dy;
  }

  manhattanNear(p: Coord) {
    const dx = Math.abs(this.location.x - p.x);
    const dy = Math.abs(this.location.y - p.y);
    return dx + dy <= this.manhattan;
  }
}

let sensorArray: Sensor[] = [];
rl.on("line", (line: string) => {
  const rSensor =
    /Sensor at x=(?<sx>\d+), y=(?<sy>\d+): closest beacon is at x=(?<bx>\d+), y=(?<by>\d+)/;
  const match = line.match(rSensor);
  if (match && match.groups) {
    const l = {
      x: Number(match.groups.sx || "0"),
      y: Number(match.groups.sy || "0"),
    };
    const b = {
      x: Number(match.groups.bx || "0"),
      y: Number(match.groups.by || "0"),
    };
    const s = new Sensor(l, b);
    sensorArray.push(s);
  }
});

rl.once("close", () => {
  part1(sensorArray);
  part2();
});
