#! /usr/local/bin/python3

import re
import sys

year = "2021"
day = "13"
problem = "Transparent Origami"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: random dots and includes instructions on how to fold it up")
print(f"> **Return**: How many dots are visible after completing just the first fold instruction on your transparent paper?")
print(f"> **NOTE**: ")

data = sys.stdin.readlines()
print(f"{data}")

points = []
folds = []
for l in data:
    line = l.strip()
    if re.match(r"\d+\,\d+", line):
        (x, y) = line.split(',')
        points.append((int(x), int(y)))
    elif line == "":
        continue
    elif re.match(f"^fold along", line):
        (along, v) = line.split("=")
        folds.append((along, int(v)))
    else:
        print(line)

print(points)
print(folds)

