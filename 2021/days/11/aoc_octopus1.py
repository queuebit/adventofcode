#! /usr/local/bin/python3

import math
import sys

year = "2021"
day = "11"
problem = "Dumbo Octopus"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: energy level of each octopus")
print(f"> **Return**: How many total flashes are there after 100 steps?")
print(f"> **NOTE**: ")

data = sys.stdin.readlines()

print(f"{data}")
datum = [[int(li) for li in list(line.strip())] for line in data]
print(datum)
print(len(datum))

rows = len(datum)
cols = len(datum[0])

print(f"{rows} x {cols}")

n = 101

flashes = []

octopi = datum

def flash_cascade(energy, flashes):
    #print(f"cascading {len(flashes)}")
    new_flashes = set()

    for r, row in enumerate(energy):
        for c, val in enumerate(row):
            inc = 0
            skip = False
            for flash_xy in flashes:
                (fx, fy) = flash_xy
                if fx == r and fy == c:
                    skip = True
                elif math.hypot(fx - r, fy - c) <= 1.5:
                    inc += 1
            if skip:
                energy[r][c] = 0
            elif val + inc > 9:
                new_flashes.add((r, c))
            else:
                energy[r][c] = val + inc
    #print(f"end cascade {len(new_flashes)}")
    return (energy, new_flashes)

for s in range(0, n):
    step_flashes = set()
    after = [[0 for _ in range(0, rows)] for _ in range(0, cols)]

    if s == 0:
        print("Before any steps:")
        for octor in octopi:
            print(''.join([str(v) for v in octor]))

        print('')
        continue

    # first pass
    for r, row in enumerate(octopi):
        for c, val in enumerate(row):
            after_val = val + 1
            after[r][c] = after_val
            if after_val > 9:
                step_flashes.add((r, c))

    # subsequent passes
    new_flashes = step_flashes
    while len(new_flashes) > 0:
        (energy, new_flashes) = flash_cascade(after, new_flashes)
        step_flashes |= new_flashes
        after = energy

    for sf in step_flashes:
        (sx, sy) = sf
        after[sx][sy] = 0
    flashes.append(step_flashes)

    print(f"After step {s}:")
    for ar in after:
        print(''.join([str(v) for v in ar]))
    print(f"{len(step_flashes)} this step.")
    print(f"{sum([len(f) for f in flashes])} total flashes.")

    print("")
    octopi = after



