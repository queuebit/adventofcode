#! /usr/local/bin/python3

import sys

year = "2021"
day = "1"
part = "Two"
problem = "Sonar Sweep"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part {part} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: each line is a measurement of the sea floor depth as the sweep looks further and further away from the submarine") 
print(f"> **Return**: count the number of times a depth measurement increases from the previous measurement (of a three-measurement sliding window)")
print(f"> **NOTE**: None")

data = sys.stdin.readlines()

print(f"{data}")
d = [int(l.strip()) for l in data]

print(f"d = {d}")


window_depths = []
for i in range(0, len(d)):
    if i + 2 >= len(d):
        break
    print(d[i])
    window_depths.append(d[i] + d[i+1] + d[i+2])

print(f"window_depths = {window_depths}")

prev = None
count = 0

for wdi in window_depths:
    if prev is not None and wdi > prev:
        count += 1
    prev = wdi

print(count)

