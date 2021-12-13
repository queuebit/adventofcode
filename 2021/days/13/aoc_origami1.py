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


def look(paper):
    print("")
    for row in paper:
        print("".join(row))
    print(f"{sum([row.count('#') for row in paper])} #s")

def fold(paper, instruction):
    (f, v) = instruction
    print("=====")
    print(f"FOLDING: {instruction}")

    if f == "fold along y":
        hamburger = []
        for y, row in enumerate(paper[0:v]):
            # print(f"{y} {row}")
            along = []
            for x, base in enumerate(row):
                mathy = v * 2 - y
                up = paper[mathy][x]
                if base == "#" or up == "#":
                    along.append("#")
                else:
                    along.append(".")
            hamburger.append(along)
                
        return hamburger
    elif f == "fold along x":
        hotdog = []
        for y, row in enumerate(paper):
            # print(f"{y} {row}")
            along = []
            for x, base in enumerate(row[0:v]):
                mathx = v * 2 - x
                right = paper[y][mathx]
                if base == "#" or right == "#":
                    along.append("#")
                else:
                    along.append(".")
            hotdog.append(along)
        return hotdog
    else:
        print("Error: wrong fold direction")

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
print("")

cols = max(points, key=lambda p: p[0])[0] + 1
rows = max(points, key=lambda p: p[1])[1] + 1

print(f"{rows} x {cols}")

paper = [["." for _ in range(0, cols)] for _ in range(0, rows)]

for (x, y) in points:
    paper[y][x] = "#"
            
look(paper)

for i, f in enumerate(folds):
    if i == 0:
        paper = fold(paper, f)
        look(paper)


