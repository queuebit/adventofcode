#! /usr/local/bin/python3

import sys

year = "2021"
day = "2"
problem = "Dive!"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: each line is a measurement of the sea floor depth as the sweep looks further and further away from the submarine") 
print(f"> **Return**: count the number of times a depth measurement increases from the previous measurement")
print(f"> **NOTE**: There is no measurement before the first measurement.")

data = sys.stdin.readlines()

print(f"{data}")
d = [l.strip() for l in data]
instructions = [i.split(' ') for i in d]

print(f"d = {d}")
print(f"instructions = {instructions}")

prev = None
count = 0

dist = 0
depth = 0

print(f"")

for i,x in instructions:
    if i == "forward":
        dist += int(x)
    if i == "down":
        depth += int(x)
    if i == "up":
        depth -= int(x)

print(f"dist = {dist}")
print(f"depth = {depth}")
print(f"d*d =")
print(dist*depth)

