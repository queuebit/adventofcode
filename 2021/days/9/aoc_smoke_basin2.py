#! /usr/local/bin/python3

import copy
import sys

def basins(heightmap, rows, cols, lows, n=0):
    adapted_heightmap = [[0 for r in range(0, cols)] for c in range(0, rows)]
    low_points = copy.deepcopy(lows)

    print("")
    print("###")
    print(f"n -> {sum([sum(l) for l in lows])}")
    print("in:")
    print(heightmap)

    risk = []
    for r, row in enumerate(heightmap):
        for c, val in enumerate(row):
            ## edges
            if r == 0:
                up = 9
                down = heightmap[r+1][c]
            elif r == rows - 1:
                up = heightmap[r-1][c]
                down = 9
            else:
                up = heightmap[r-1][c]
                down = heightmap[r+1][c]

            if c == 0:
                left = 9
                right = heightmap[r][c+1]
            elif c == cols -1:
                left = heightmap[r][c-1]
                right = 9
            else:
                left = heightmap[r][c-1]
                right = heightmap[r][c+1]

            if val < left and val < right and val < up and val < down:
                print(f"{val} {r},{c} is low")
                adapted_heightmap[r][c] = 9
                low_points[r][c] = 1
            else:
                adapted_heightmap[r][c] = val
                #low_points[r][c] = 0

            if (r == 0 and c == 0):
                print(f"l,r,u,d,v = {left}, {right}, {up}, {down}, {val}")
    if low_points == lows:
        print(low_points)
        return low_points
    else:
        print(low_points)
        print(adapted_heightmap)
        return basins(adapted_heightmap, rows, cols, low_points, n+1)

year = "2021"
day = "9"
problem = "Smoke Basin"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: heightmap of the floor of the nearby caves")
print(f"> **Return**: What do you get if you multiply together the sizes of the three largest basins?")
print(f"> **NOTE**: lava tubes")

data = sys.stdin.readlines()

print(f"{data}")
datum = [[int(li) for li in list(line.strip())] for line in data]
print(datum)
print(len(datum))

rows = len(datum)
cols = len(datum[0])

low_points = [[0 for r in range(0, cols)] for c in range(0, rows)]

## IDEA: use recursive depth analysis of basins with low replaced with 9
risk = basins(datum, rows, cols, low_points)

