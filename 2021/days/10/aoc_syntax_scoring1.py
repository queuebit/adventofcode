#! /usr/local/bin/python3

import sys

year = "2021"
day = "10"
problem = "Syntax Scoring"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: copy of the navigation subsystem")
print(f"> **Return**: What is the total syntax error score for those errors?")
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

def check_line(line):
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


for l in datum:
    note = check_line(l)
    if note == 'incomplete':
        continue
    elif note == 'pass':
        print(f"{l} line PASSES")
    elif isinstance(note, tuple):
        (exp, found) = note
        print(f"Expected {exp}, but found {found} instead.")
        errors.append(found)

print(errors)
error_score = sum([error_scores[e] for e in errors])
print(error_score)
