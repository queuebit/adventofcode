#! /usr/local/bin/python3

import sys

year = "2021"
day = "2"
problem = "Dive!"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: planned course instructions (with more info from instructions manual)")
print(f"> **Return**: depth * horizontal position")
print(f"> **NOTE**: since you're on a submarine, down and up affect your depth, and so they have the opposite result of what you might expect")

data = sys.stdin.readlines()

print(f"{data}")
d = [l.strip() for l in data]
instructions = [i.split(' ') for i in d]

print(f"d = {d}")
print(f"instructions = {instructions}")

prev = None
count = 0

aim = 0
dist = 0
depth = 0

print(f"")

for i,x in instructions:
    if i == "forward":
        dist += int(x)
        depth += aim * int(x)
    if i == "down":
        aim += int(x)
    if i == "up":
        aim -= int(x)

print(f"dist = {dist}")
print(f"depth = {depth}")
print(f"d*d =")
print(dist*depth)

