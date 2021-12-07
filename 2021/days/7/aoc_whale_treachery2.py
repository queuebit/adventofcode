#! /usr/local/bin/python3

import sys

year = "2021"
day = "7"
problem = "The Treachery of Whales"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

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
mean = sum(c) / length
r_mean = round(sum(c) / length)
print(f"median is at pos: {median_pos} of {length} : {median}")
print(f"mean is: {sum(c)} / {length} : {mean} --> rounded to: {r_mean}")

## First guess
print(sum([sum(list(range(1, abs(cf - r_mean) + 1))) for cf in sc]))

## Second guess
print(sum([sum(list(range(1, abs(cf - r_mean - 1) + 1))) for cf in sc]))

## Third guess
print(sum([sum(list(range(1, abs(cf - r_mean + 1) + 1))) for cf in sc]))

## Fourth guess
print(sum([sum(list(range(1, abs(cf - r_mean - 2) + 1))) for cf in sc]))

## Fifth guess
print(sum([sum(list(range(1, abs(cf - r_mean + 2) + 1))) for cf in sc]))

