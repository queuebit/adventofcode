#! /usr/local/bin/python3

import sys

year = "2021"
day = "7"
problem = "The Treachery of Whales"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: horizontal position of each crab")
print(f"> **Return**: necessary fuel to align to position")
print(f"> **NOTE**: whales are crazy")

data = sys.stdin.readlines()

print(f"{data}")
datum = [l.strip() for l in data]

c = [int(ci) for ci in datum[0].split(',')]
sc = sorted(c)
print(c)
print(sc)

length = len(c)
median_pos = int(length / 2)
median = sc[median_pos]
print(f"median is at pos: {median_pos} of {length} : {median}")
print(sc[median])

print(sum([abs(cf - median) for cf in sc]))


