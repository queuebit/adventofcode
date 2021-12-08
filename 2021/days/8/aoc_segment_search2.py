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


for di, [si, so] in enumerate(datum):
    if di > 0:
        continue

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

    ### b or e - diff(1 + 2 + 5)
    [d2, d3, d5] = d_info[235]
    c_be = Counter(d2 + d3 + d5)
    l_be = set()
    for l in c_be:
        if c_be[l] == 1:
            l_be.add(l)
    transcriber['be'] = l_be

    ### b - intersection of be and bd
    transcriber['b'] = (transcriber['be'] & transcriber['bd']).pop()
    ### d - intersection of be and bd
    transcriber['d'] = (transcriber['bd'] - {transcriber['b']}).pop()
    ### e - intersection of be and bd
    transcriber['e'] = (transcriber['be'] - {transcriber['b']}).pop()

    ### d - 0 missing; 6 and 9 have it
    #[d0, d6, d9] = d_info[69]
    #print(Counter(d0 + d6 + d9))


    print(transcriber)



    ## Translate
    out = ""
    for o in so.split(' '):
        os = ''.join(sorted(list(o)))
        if os in decoder:
            out += str(decoder[os])
        else:
            out += '_'
    output_values.append(out)
    #print(out)

#print(''.join(output_values))
#print(len([d for d in list(''.join(output_values)) if d != '_']))
