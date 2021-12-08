#! /usr/local/bin/python3

import sys

year = "2021"
day = "8"
problem = "Seven Segment Search"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: four digit ouput value from signals")
print(f"> **Return**: how many times do 1, 4, 7, 8 appear?")
print(f"> **NOTE**: The entry is wrapped here to two lines so it fits; in your notes, it will all be on a single line.")

data = sys.stdin.readlines()

print(f"{data}")
datum = [[li.strip() for li in l.strip().split('|')] for l in data]
print(datum)
print(len(datum))


output_values = []

segment_map = {
        2: [1, 'cf'],
        3: [7, 'acf'],
        4: [4, 'bcdf'],
        7: [8, 'abcdefg'],
        }


for di, [si, so] in enumerate(datum):
    #if di > 0:
    #    continue

    print(di)
    print(si)
    print(so)
    print("")

    decoder = {}
    ## Decode
    for s in si.split(' '):
        ss = ''.join(sorted(list(s)))
        sl = len(ss)
        print(f"{s} -> {ss} has length: {sl}")
        if sl in segment_map:
            [md, mls] = segment_map[sl]
            decoder[ss] = md
            print(f"{ss} maps to {md}:{mls}")
        else:
            print(f"{ss} maps to UNKNOWN")
    print(decoder)

    ## Translate
    out = ""
    for o in so.split(' '):
        os = ''.join(sorted(list(o)))
        if os in decoder:
            out += str(decoder[os])
        else:
            out += '_'
    output_values.append(out)
    print(out)

print(''.join(output_values))
print(len([d for d in list(''.join(output_values)) if d != '_']))
