#! /usr/local/bin/python3

import math
import sys

year = "2021"
day = "6"
problem = "Lanternfish"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

days = 256

print(f"> **Given**: nearby lanternfish ages")
print(f"> **Return**: number of lanternfish after {days} days")
print(f"> **NOTE**: 0 counts")

data = sys.stdin.readlines()

print(f"{data}")
datum = [l.strip() for l in data]

l = [int(li) for li in datum[0].split(',')]
print(l)

buckets = [0 for _ in range(0, 9)]

for li in l:
    buckets[li] = buckets[li] + 1

print(buckets)

for dai, d in enumerate(range(0, days + 1)):
    if dai == 0:
        continue
    eod = [0 for _ in range(0, 9)]
    for i, bi in enumerate(buckets):
        if i == 0:
            eod[8] = bi
            eod[6] = bi
        else:
            eod[i-1] = eod[i-1] + bi
    buckets = eod
    print(buckets)

print(sum(buckets))
