#! /usr/local/bin/python3

import sys

year = "2021"
day = "5"
problem = "Hydrothermal Venture"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: hydrothermal vent lines")
print(f"> **Return**: number of coords with > 2")
print(f"> **NOTE**: map graph is helpful")

data = sys.stdin.readlines()

print(f"{data}")
d = [l.strip() for l in data]

diagram = []
dim = 1000
for i in range(0, dim):
    a = [0 for _ in range(0, dim)]
    diagram.append(a)

print(diagram)

for i, l in enumerate(d):
    f, t = [[int(i) for i in co.split(',')] for co in l.split(' -> ')]
    x1, y1 = f
    x2, y2 = t
    if x1 == x2:
        if y2 > y1:
            step = 1
        else:
            step = -1
        for v in range(y1, y2 + step, step):
            before = diagram[v][x1]
            after = before + 1
            diagram[v][x1] = after
        print(f"{i}: VERTICAL -- {f} to {t}")
    elif y1 == y2:
        if x2 > x1:
            step = 1
        else:
            step = -1
        for v in range(x1, x2 + step, step):
            before = diagram[y1][v]
            after = before + 1
            diagram[y1][v] = after
        print(f"{i}: HORIZONTAL -- {f} to {t}")
    else:
        if x2 > x1:
            stepx = 1
        elif x2 < x1:
            stepx = -1
        if y2 > y1:
            stepy = 1
        elif y2 < y1:
            stepy = -1
        for xo, y in enumerate(range(y1, y2 + stepy, stepy)):
            x = x1 + xo * stepx
            before = diagram[y][x]
            after = before + 1
            diagram[y][x] = after
        print(f"{i}: DIAGONAL -- {f} to {t}")

dark = 0
for x in range(0, dim):
    dark_spots = len(list(filter(lambda i: i > 1, diagram[x])))
    print(dark_spots)
    dark += dark_spots
    print(diagram[x])

print(dark)

