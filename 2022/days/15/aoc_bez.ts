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

  // establish possible points
  // let possibilities = new Set<string>();
  // for (let x = area.minX; x <= area.maxX; x++) {
  //   for (let y = area.minY; y <= area.maxY; y++) {
  //     possibilities.add(`${x}-${y}`);
  //   }
  // }
  // const possiblePossibiles = possibilities.size;

  // remove based on sensor knowledge
  const KEY_ROW = 2000000;
  let knownNots = new Set<string>();
  for (const sensor of sensors) {
    // location
    if (sensor.location.y === KEY_ROW)
      knownNots.add(`${sensor.location.x},${sensor.location.y}`);

    // spaces manhattan from beacon
    for (let dx = -sensor.manhattan; dx <= sensor.manhattan; dx++) {
      if (sensor.location.y === KEY_ROW) {
        knownNots.add(`${sensor.location.x + dx},${sensor.location.y}`);
      }

      for (let dy = 0; dy <= Math.abs(Math.abs(dx) - sensor.manhattan); dy++) {
        if (sensor.location.y + dy === KEY_ROW) {
          knownNots.add(`${sensor.location.x + dx},${sensor.location.y + dy}`);
        }
        if (sensor.location.y - dy === KEY_ROW) {
          knownNots.add(`${sensor.location.x + dx},${sensor.location.y - dy}`);
        }
      }
    }
    // beacon
    if (sensor.beacon.y === KEY_ROW)
      knownNots.delete(`${sensor.beacon.x},${sensor.beacon.y}`);
  }
  console.log(Array.from(knownNots).sort());
  console.log(knownNots.size);

  // % time node aoc_bez.js < puzzle.in
  // node aoc_bez.js < puzzle.in  1974.82s user 4.32s system 99% cpu 33:03.10 total
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
