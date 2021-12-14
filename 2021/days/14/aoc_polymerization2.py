#! /usr/local/bin/python3

from collections import Counter
import sys

year = "2021"
day = "14"
problem = "Extended Polymerization"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: a polymer template and a list of pair insertion rules")
print(f"> **Return**: What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?")
print(f"> **NOTE**: these pairs overlap: the second element of one pair is the first element of the next pair. Also, because all pairs are considered simultaneously, inserted elements are not considered to be part of a pair until the next step.")

data = sys.stdin.readlines()
print(f"{data}")


steps = 10
template = ""
rules = {}

for i, l in enumerate(data):
    if i == 0:
        template = l.strip()
    elif i == 1:
        continue
    else:
        (pair, ins) = l.strip().split(' -> ')
        rules[pair] = ins

print(template)
print(rules)
print("")

polymer = template
poly_map = {}

for p, pep in enumerate(list(template)):
    if p + 1 < len(template):
        pep2 = polymer[p+1]
        pair = f"{pep}{pep2}"

        if pair in poly_map:
            poly_map[pair] += 1
        else:
            poly_map[pair] = 1 

### DUMB
for s in range(0, steps + 1):
    if s == 0:
        print(f"Template: {polymer}")
    else:
        poly_pep = []
        for p, pep in enumerate(list(polymer)):
            ins = ""
            if p + 1 < len(polymer):
                ins = rules[f"{pep}{polymer[p+1]}"]
            poly_pep.append(f"{pep}{ins}")
        polymer = "".join(poly_pep)
        print(f"After step {s} : {len(polymer)}: {polymer}")

poly_count = Counter(list(polymer))
poly_features = poly_count.most_common()
most = poly_features[0][1]
least = poly_features[-1][1]
print(poly_features)
print(most - least)

### SMART
for s in range(0, steps + 1):
    if s == 0:
        print(f"--> Template: {poly_map}")
    else:
        next_map = {}
        for pair in poly_map:
            pair_count = poly_map[pair]
            [pep, pep2] = list(pair)
            ins = rules[pair]
            
            npair = f"{pep}{ins}"
            npair2 = f"{ins}{pep2}"

            if npair in next_map:
                next_map[npair] += pair_count
            else:
                next_map[npair] = pair_count

            if npair2 in next_map:
                next_map[npair2] += pair_count
            else:
                next_map[npair2] = pair_count
        poly_map = next_map

        print(f"--> After step {s} {sum(poly_map.values())}: {poly_map}")

smart_count = {
        template[-1]: 1
        }
for pair in poly_map:
    pair_count = poly_map[pair]
    [pep, _] = list(pair)

    if pep in smart_count:
        smart_count[pep] += pair_count
    else:
        smart_count[pep] = pair_count

print(smart_count)
s_count = sorted(smart_count.values(), reverse=True)
most = s_count[0]
least = s_count[-1]
print(most - least)

