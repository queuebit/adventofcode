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
};
const part2 = (sensors: Sensor[]) => {
  const area = {
    xMin: 0,
    xMax: 20,
    yMin: 0,
    yMax: 20,
  };
  // const area = {
  //   xMin: 0,
  //   xMax: 4000000,
  //   yMin: 0,
  //   yMax: 4000000,
  // };
  const startingPoint = {
    x: (area.xMax + area.xMin) / 2,
    y: (area.yMax + area.yMin) / 2,
  };
  for (let i = 0; i <= area.xMax / 2; i++) {
    const possibles = [
      { x: startingPoint.x + i, y: startingPoint.y + i },
      { x: startingPoint.x + i, y: startingPoint.y - i },
      { x: startingPoint.x - i, y: startingPoint.y - i },
      { x: startingPoint.x - i, y: startingPoint.y + i },
    ];
    for (let possible of possibles) {
      console.log(possible);
      if (
        sensors.every(
          (s) =>
            s.notNearX(possible) &&
            s.notNearY(possible) &&
            !s.manhattanNear(possible)
        )
      )
        return possible;
    }
  }
  return { x: 0, y: 0 };
};

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

  notNearX(p: Coord) {
    const dx = Math.abs(this.location.x - p.x);
    return dx > this.manhattan;
  }

  notNearY(p: Coord) {
    const dy = Math.abs(this.location.y - p.y);
    return dy > this.manhattan;
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
    /Sensor at x=(?<sx>\-?\d+), y=(?<sy>\-?\d+): closest beacon is at x=(?<bx>\-?\d+), y=(?<by>\-?\d+)/;
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
  } else {
    console.log(line);
  }
});

rl.once("close", () => {
  part1(sensorArray);
  const b = part2(sensorArray);
  console.log(b);
  console.log(b.x * 4000000 + b.y);
});
