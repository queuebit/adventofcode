#! /usr/local/bin/python3

import sys

year = "2021"
day = "9"
problem = "Smoke Basin"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: heightmap of the floor of the nearby caves")
print(f"> **Return**: What is the sum of the risk levels of all low points on your heightmap?")
print(f"> **NOTE**: lava tubes")

data = sys.stdin.readlines()

print(f"{data}")
datum = [[int(li) for li in list(line.strip())] for line in data]
print(datum)
print(len(datum))

rows = len(datum)
cols = len(datum[0])

low_points = [[0 for r in range(0, rows)] for c in range(0, cols)]
risk = []
print(low_points)
for r, row in enumerate(datum):
    for c, val in enumerate(row):
        ## edges
        if r == 0:
            up = 10
            down = datum[r+1][c]
        elif r == rows - 1:
            up = datum[r-1][c]
            down = 10
        else:
            up = datum[r-1][c]
            down = datum[r+1][c]

        if c == 0:
            left = 10
            right = datum[r][c+1]
        elif c == cols -1:
            left = datum[r][c-1]
            right = 10
        else:
            left = datum[r][c-1]
            right = datum[r][c+1]

        if val < left and val < right and val < up and val < down:
            print(f"{val} {r},{c} is low")
            risk.append(val + 1)

print(sum(risk))

