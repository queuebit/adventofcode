#! /usr/local/bin/python3

import sys

year = "2021"
day = "3"
problem = "Binary Diagnostic"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: diagnostic report")
print(f"> **Return**: power consumption")
print(f"> **NOTE**: provide answer in decimal, not binary")

data = sys.stdin.readlines()

print(f"{data}")
d = [l.strip() for l in data]

print(f"d = {d}")

zd = list(zip(*d))
print(f"zd = {zd}")

prev = None
count = 0

gamma = ""
epsilon = ""

print(f"")

for iv in zd:
    iv0 = iv.count('0')
    iv1 = iv.count('1')

    if iv0 > iv1:
        gamma += '0'
        epsilon += '1'
    elif iv1 > iv0:
        gamma += '1'
        epsilon += '0'
    else:
        print('ERROR')

print(f"gamma = {gamma} --> {int(gamma, 2)}")
print(f"epsilon = {epsilon} --> {int(epsilon, 2)}")
print(f"g*e =")
print(int(gamma, 2) * int(epsilon, 2))

