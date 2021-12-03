#! /usr/local/bin/python3

import sys

year = "2021"
day = "3"
problem = "Binary Diagnostic"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: diagnostic report")
print(f"> **Return**: life support rating")
print(f"> **NOTE**: LSR = O2GR * CO2SR")

data = sys.stdin.readlines()

print(f"{data}")
d = [l.strip() for l in data]

print(f"d = {d}")

prev = None
count = 0

o2_filter = d
o2 = ""

co2_filter = d
co2 = ""

print(f"")

for i in range(0, 16):
    if i >= len(o2_filter[0]):
        break

    ### Oxygen generator rating
    o2i = list(zip(*o2_filter))[i]


    o2i0 = o2i.count('0')
    o2i1 = o2i.count('1')

    if o2i0 > o2i1:
        o2_filter = [r for r in o2_filter if r[i] == '0']
    elif o2i1 > o2i0:
        o2_filter = [r for r in o2_filter if r[i] == '1']
    else:
        o2_filter = [r for r in o2_filter if r[i] == '1']

    ### CO2 generator rating
    print(co2_filter)
    co2i = list(zip(*co2_filter))[i]


    co2i0 = co2i.count('0')
    co2i1 = co2i.count('1')

    if len(co2_filter) == 1:
        co2_filter = co2_filter
    elif co2i0 > co2i1:
        co2_filter = [r for r in co2_filter if r[i] == '1']
    elif co2i1 > co2i0:
        co2_filter = [r for r in co2_filter if r[i] == '0']
    else:
        co2_filter = [r for r in co2_filter if r[i] == '0']

o2_rating = o2_filter[0]
co2_rating = co2_filter[0]
print(f"o2 = {o2_rating} --> {int(o2_rating, 2)}")
print(f"co2 = {co2_rating} --> {int(co2_rating, 2)}")
print(f"o2*co2 =")
print(int(o2_rating, 2) * int(co2_rating, 2))

