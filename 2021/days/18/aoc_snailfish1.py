#! /usr/local/bin/python3

import json
import sys

year = "2021"
day = "18"
problem = "Snailfish"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: a list of snailfish numbers")
print(f"> **Return**: What is the magnitude of the final sum?")
print(f"> **NOTE**: ")

data = sys.stdin.readlines()
print(f"{data}")

school = []

for sn in data:
    snailfish = json.loads(sn)
    print(snailfish[0])
    school.append(snailfish)
    

