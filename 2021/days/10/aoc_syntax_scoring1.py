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

OPEN = ['[', '(', '{', '<']
CLOSED = [']', ')', '}', '>']
MATCHING = {
        ']': '[',
        ')': '(',
        '}': '{',
        '>': '<',
        }

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

            if MATCHING[c] == exp:
                continue
            else:
                return (exp, c)

    if len(syntax_stack) == 0:
        return 'complete'
    else:
        return 'incomplete'

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


for i, l in enumerate(datum):
#    if i > 2:
#        continue

    note = check_syntax(l)
    if note == 'incomplete':
        continue
    elif note == 'pass':
        print(f"{l} line PASSES")
    elif isinstance(note, tuple):
        (exp, found) = note
        print(f"{l} - Expected {exp}, but found {found} instead.")
        errors.append(found)

print(errors)
error_score = sum([error_scores[e] for e in errors])
print(error_score)
