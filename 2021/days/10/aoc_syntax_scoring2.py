#! /usr/local/bin/python3

import math
import sys

year = "2021"
day = "10"
problem = "Syntax Scoring"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: copy of the navigation subsystem")
print(f"> **Return**: What is the middle score?")
print(f"> **NOTE**: first illegal character")

data = sys.stdin.readlines()

print(f"{data}")
datum = [line.strip() for line in data]
print(datum)
print(len(datum))

errors = []

error_scores = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
        }

autocomplete = []

complete_scores = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
        }

OPEN = ['[', '(', '{', '<']
CLOSED = [']', ')', '}', '>']
MATCHING_CO = {
        ']': '[',
        ')': '(',
        '}': '{',
        '>': '<',
        }
MATCHING_OC = { v: k for k, v in MATCHING_CO.items() }

def check_syntax(line):
    # iterate through characters
    # "state machine" to allow for any open
    # "state machine" returns (exp, found) if CLOSED does not match popped stack OPEN
    syntax_stack = []
    for c in list(line):
        if c in OPEN:
            syntax_stack.append(c)
        elif c in CLOSED:
            exp = syntax_stack.pop()
            #print(f"STACK: {syntax_stack}")
            #print(f"EXP: {exp} FOUND: {c}")

            if MATCHING_CO[c] == exp:
                continue
            else:
                return (exp, c)

    if len(syntax_stack) == 0:
        return 'complete'
    else:
        return [MATCHING_OC[sep] for sep in syntax_stack[::-1]]

def hc_check_line(line):
    if line == "{([(<{}[<>[]}>{[]{[(<()>":
        return (']', '}')
    elif line == "[[<[([]))<([[{}[[()]]]":
        return (']', ')')
    elif line == "[{[{({}]{}}([{[{{{}}([]":
        return (')', ']')
    elif line == "[<(<(<(<{}))><([]([]()":
        return ('>', ')')
    elif line == "<{([([[(<>()){}]>(<<{{":
        return (']', '>')
    else:
        return 'incomplete'

def complete_score(sequence):
    score = 0
    for s in sequence:
        score *= 5
        score += complete_scores[s]
    return score

for i, l in enumerate(datum):
#    if i > 2:
#        continue

    note = check_syntax(l)
    if note == 'pass':
        print(f"{l} line PASSES")
    elif isinstance(note, tuple):
        (exp, found) = note
        #print(f"{l} - Expected {exp}, but found {found} instead.")
        errors.append(found)
    else: #incomplete
        print(f"{l} - Complete by adding {''.join(note)}.")
        autocomplete.append(note)

print(errors)
error_score = sum([error_scores[e] for e in errors])
print(error_score)

print(autocomplete)
autocomplete_scores = [complete_score(seq) for seq in autocomplete]
auto_sort = sorted(autocomplete_scores)
auto_middle = math.floor(len(autocomplete) / 2)
print(auto_sort[auto_middle])
