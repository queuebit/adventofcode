#! /usr/local/bin/python3

from collections import Counter
import sys

year = "2021"
day = "8"
problem = "Seven Segment Search"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: four digit ouput value from signals")
print(f"> **Return**: how many times do 1, 4, 7, 8 appear?")
print(f"> **NOTE**: After some careful analysis")

data = sys.stdin.readlines()

print(f"{data}")
datum = [[li.strip() for li in l.strip().split('|')] for l in data]
print(datum)
print(len(datum))


output_values = []

#  0:      1:      2:      3:      4:
# aaaa    ....    aaaa    aaaa    ....
#b    c  .    c  .    c  .    c  b    c
#b    c  .    c  .    c  .    c  b    c
# ....    ....    dddd    dddd    dddd
#e    f  .    f  e    .  .    f  .    f
#e    f  .    f  e    .  .    f  .    f
# gggg    ....    gggg    gggg    ....
#
#  5:      6:      7:      8:      9:
# aaaa    aaaa    aaaa    aaaa    aaaa
#b    .  b    .  .    c  b    c  b    c
#b    .  b    .  .    c  b    c  b    c
# dddd    dddd    ....    dddd    dddd
#.    f  e    f  .    f  e    f  .    f
#.    f  e    f  .    f  e    f  .    f
# gggg    gggg    ....    gggg    gggg

segment_map = {
        2: [1, 'cf'],
        3: [7, 'acf'],
        4: [4, 'bcdf'],
#        5: [[2, 'acdeg'], [3, 'acdfg'], [5, 'abdfg']],
#        6: [[0, 'abcefg'], [6, 'abdefg'], [9, 'abcdfg']],
        7: [8, 'abcdefg'],
        }

display = {
        'abcefg': 0,
        'cf': 1,
        'acdeg': 2,
        'acdfg': 3,
        'bcdf': 4,
        'abdfg': 5,
        'abdefg': 6,
        'acf': 7,
        'abcdefg': 8,
        'abcdfg': 9,
        }

for di, [si, so] in enumerate(datum):
    #if di > 0:
    #    continue

    print(di)
    print(si)
    print(so)
    print("")

    d_info = {
            }
    decoder = {}
    transcriber = {}
    ## Decode
    for s in si.split(' '):
        ss = ''.join(sorted(list(s)))
        sl = len(ss)
        print(f"{s} -> {ss} has length: {sl}")
        if sl in segment_map:
            [md, mls] = segment_map[sl]
            decoder[ss] = md
            d_info[md] = set(ss)
            print(f"{ss} maps to {md}:{mls}")
        elif sl == 5:
            print(f"{ss} maps to one of [2,3,5]")
            if 235 in d_info:
                d_info[235] = d_info[235] + [list(ss)]
            else:
                d_info[235] = [list(ss)]
        elif sl == 6:
            print(f"{ss} maps to one of [0,6,9]")
            if 69 in d_info:
                d_info[69] = d_info[69] + [list(ss)]
            else:
                d_info[69] = [list(ss)]
        else:
            print(f"{ss} maps to ¯\_(ツ)_/¯")
    print(d_info)
    print(decoder)

    ## Transcribe
    ### a - diff(1 + 7)
    transcriber['a'] = (d_info[1] ^ d_info[7]).pop()

    ### b or d - diff(1 + 4)
    transcriber['bd'] = d_info[1] ^ d_info[4]

    ### b or e - single in 2, 3, 5
    [d2, d3, d5] = d_info[235]
    c_be = Counter(d2 + d3 + d5)
    l_be = set()
    for l in c_be:
        if c_be[l] == 1:
            l_be.add(l)
    transcriber['be'] = l_be

    ### b - intersection of be and bd
    transcriber['b'] = (transcriber['be'] & transcriber['bd']).pop()
    ### d - bd - b
    transcriber['d'] = (transcriber['bd'] - {transcriber['b']}).pop()
    ### e - be - b
    transcriber['e'] = (transcriber['be'] - {transcriber['b']}).pop()
    ### g - 8 - 7 - 4 - e
    transcriber['g'] = (d_info[8] - d_info[7] - d_info[4] - {transcriber['e']}).pop()

    ### f - 9/10 (only missing on 2
    [d0, d6, d9] = d_info[69]
    c_f = Counter(d0 + list(d_info[1]) + d2 + d3 + list(d_info[4]) + d5 + d6 + list(d_info[7]) + list(d_info[8]) + d9)
    for l in c_f:
        if c_f[l] == 9:
            transcriber['f'] = l
    ### c - all - a, b, d, e, f, g
    transcriber['c'] = ({ 'a', 'b', 'c', 'd', 'e', 'f', 'g'}
            - set(transcriber['a']) - set(transcriber['b'])
            - set(transcriber['d']) - set(transcriber['e'])
            - set(transcriber['f']) - set(transcriber['g'])).pop()

    print(transcriber)
    r_transcriber = { transcriber[k]: k for k in transcriber if len(k) == 1 }
    print(r_transcriber)

    ## Translate
    out = ""
    for o in so.split(' '):
        wires = ''.join(sorted([r_transcriber[c] for c in list(o)]))
        digit = display[wires]
        out += str(digit)
    output_values.append(out)
    print(out)

print(output_values)
print(sum([int(v) for v in output_values]))
#print(len([d for d in list(''.join(output_values)) if d != '_']))
