#! /usr/local/bin/python3

import copy
import sys

def basins(heightmap, rows, cols, lows, n=0, minima=False):
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

    if minima or low_points == lows:
        #print(low_points)
        return low_points
    else:
        #print(low_points)
        #print(adapted_heightmap)
        return basins(adapted_heightmap, rows, cols, low_points, n+1)

#def size(basinmap):
#    rows = len(basinmap)
#    cols = len(basinmap[0])
#
#    explored = set()
#    def is_in_basin(x,y, b=0):
#        explored.add(f"{x}{y}")
#        if x < 0 or x == cols or y < 0 or y == rows:
#            return False
#        elif basinmap[x][y] == 1:
#            b += 1
#            return b
#
#    basins = []
#    b = 0
#    for r, row in enumerate(basinmap):
#        for c, col in enumerate(row):
#            if f"{r}{c}" in explored:
#                continue
#            elif is_in_basin(r, c, b):
#                b += 1
#                b = is_in_basin(r - 1, c, b)
#                b = is_in_basin(r + 1, c, b)
#                b = is_in_basin(r, c - 1, b)
#                b = is_in_basin(r, c + 1, b)
#            else:
#                b = 0
#                basins.append(b)
#    return(basins)
#
#sample = [[1, 1, 0], [1, 0, 0], [0, 0, 0]]
#print(f"SIZE: {size(sample)}")

def neighbors(xy, mx, my):
    (x, y) = xy

    ns = []

    if x > 0:
        ns.append((x - 1, y))
    if x < mx - 1:
        ns.append((x + 1, y))
    if y > 0:
        ns.append((x, y - 1))
    if y < my - 1:
        ns.append((x, y + 1))

    print(f"Neighbors call: {xy} --> {mx}, {my} ==> {ns}")
    return ns

        
def basin_size(xy, basinmap, explored):
    rows = len(basinmap)
    cols = len(basinmap[0])

    bs = 1

    for neighbor in neighbors(xy, rows, cols):
        (x, y) = neighbor
        (nx, ny) = neighbor
        if (nx, ny) not in explored:
            explored.add((nx, ny))
            #print(f"Neighbor: {nx}, {ny}")
            if basinmap[nx][ny] != 0:
                bs += basin_size((nx, ny), basinmap, explored)
    return bs
            
## TODO: sum 1s in graph surrounded by 0s
## OUTPUT: [3, 9, 14, 9]
# [1, 1, 0, 0, 0, 1, 1, 1, 1, 1]
# [1, 0, 1, 1, 1, 0, 1, 0, 1, 1]
# [0, 1, 1, 1, 1, 1, 0, 1, 0, 1]
# [1, 1, 1, 1, 1, 0, 1, 1, 1, 0]
# [0, 1, 0, 0, 0, 1, 1, 1, 1, 1]

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

d2 = []
for r, row in enumerate(datum):
    d2_row = []
    for c, val in enumerate(row):
        if val != 9:
            d2_row.append(1)
        else:
            d2_row.append(0)
    d2.append(d2_row)


bs = basins(d2, rows, cols, low_points)
minima = basins(datum, rows, cols, low_points, n=0, minima=True)


print(minima)
bss = []
for r, row in enumerate(minima):
    for c, val in enumerate(row):
        if val == 1:
            explored = set()
            explored.add((r, c))
            bss.append(basin_size((r, c), d2, explored))

## IDEA: use recursive depth analysis of basins with low replaced with 9
#risk = basins(datum, rows, cols, low_points)
bss_sorted = sorted(bss, reverse=True)
print(bss_sorted)
print(f"MIN: {sum([sum(l) for l in minima])}")
print(f"BASINS: {len(bss_sorted)}")
print(f"ALL: {sum([sum(l) for l in bs])}")
print(f"BASIN SUM: {sum(bss_sorted)}")
print(bss_sorted[0] * bss_sorted[1] * bss_sorted[2])

