#! /usr/local/bin/python3

import sys

year = "2021"
day = "6"
problem = "Lanternfish"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: nearby lanternfish ages")
print(f"> **Return**: number of lanternfish after 80 days")
print(f"> **NOTE**: 0 counts")

data = sys.stdin.readlines()

print(f"{data}")
datum = [l.strip() for l in data]

r = 6 #days (0 based)
g0 = r + 2 #days

l = [int(li) for li in datum[0].split(',')]
print(l)

days = 80

for d in range(0, days + 1):
    if d == 0:
        print(f"Initial state: {l}")
    else:
        new_f = []
        school = []
        for f in l:
            if f == 0:
                school.append(r)
                new_f.append(g0)
            else:
                school.append(f - 1)
        l = school + new_f
        print(f"After {d} day{'' if d == 1 else 's'}: {l}")

print(len(l))
