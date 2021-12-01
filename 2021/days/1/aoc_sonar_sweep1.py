#! /usr/local/bin/python3

import sys

year = "2021"
day = "1"
problem = "Sonar Sweep"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: each line is a measurement of the sea floor depth as the sweep looks further and further away from the submarine") 
print(f"> **Return**: count the number of times a depth measurement increases from the previous measurement")
print(f"> **NOTE**: There is no measurement before the first measurement.")

data = sys.stdin.readlines()

print(f"{data}")
d = [int(l.strip()) for l in data]

print(f"d = {d}")

prev = None
count = 0

for di in d:
    if prev is not None and di > prev:
        count += 1
    prev = di

print(count)

