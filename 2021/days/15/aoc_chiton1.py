#! /usr/local/bin/python3

from collections import Counter
import sys

year = "2021"
day = "15"
problem = "Chiton"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: a map of risk level throughout the cave")
print(f"> **Return**: What is the lowest total risk of any path from the top left to the bottom right?")
print(f"> **NOTE**: don't count the risk level of your starting position unless you enter it; leaving it adds no risk to your total")

data = sys.stdin.readlines()
print(f"{data}")

