#! /usr/local/bin/python3

import sys

year = "2021"
day = "16"
problem = "Packet Decoder"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: the transmission in hexadecimal")
print(f"> **Return**: What do you get if you evaluate the expression represented by your hexadecimal-encoded BITS transmission?")
print(f"> **NOTE**: ")

dataA = ["D2FE28\n"]
dataB = ["38006F45291200\n"]
dataC = ["EE00D40C823060\n"]
#data = dataC
data = sys.stdin.readlines()
print(f"{data}")

hex_map = {
        "0": "0000",
        "1": "0001",
        "2": "0010",
        "3": "0011",
        "4": "0100",
        "5": "0101",
        "6": "0110",
        "7": "0111",
        "8": "1000",
        "9": "1001",
        "A": "1010",
        "B": "1011",
        "C": "1100",
        "D": "1101",
        "E": "1110",
        "F": "1111",
        }

def decode(bits, stack=[]):
    print("|")
    print("|___" * len(stack) + bits)

    if len(bits) < 11:
        return

    used = ""
    vvv = bits[0:3]
    ver = int(vvv, 2)
    ttt = bits[3:6]
    rem = bits[6:]
    stack.append(ver)

    used = f"{vvv}{ttt}"

    print(f"VERSION: {vvv} -> {int(vvv, 2)}")
    print(f"TYPE: {ttt} -> {int(ttt, 2)}")

    print(f"REM: {rem}")

    if ttt == "100": ## Literal
        window = 5
        literal = ""
        for i in range(0, int(len(rem) / window)):
            start = i * window
            end = start + window
            s = rem[start:end]
            used += s
            literal += s[1:]
            if s[0] == "0":
                break

        print(f"LITERAL: {literal} -> {int(literal, 2)}")
        return literal, used

    else: ## Operator
        length_type_id = rem[0]
        r2 = rem[1:]
        used += length_type_id


        if length_type_id == "0":
            el = 15
            lll = r2[0:el]
            used += lll

            l_subpackets = int(lll, 2)
            print(f"15 bits -> length of subpackets in bits: {lll} -> {l_subpackets}")
            r3 = r2[el:]
            subpackets = r3[0:l_subpackets]
            print(f"subpackets: {subpackets}")

            s_used = ""
            subs = []
            while len(s_used) < l_subpackets:
                (s_decode, sub_used) = decode(subpackets, stack)
                subs.append(s_decode)
                used += sub_used
                s_used += sub_used
                subpackets = subpackets[len(sub_used):]
            return subs, used
        else:
            el = 11
            lll = r2[0:el]
            used += lll

            n_subpackets = int(lll, 2)
            print(f"11 bits -> number of subpackets is: {lll} -> {n_subpackets}")
            r3 = r2[el:]
            subpackets_am = r3[0:]
            print(f"subpackets among: {subpackets_am}")
            subs = []
            for _ in range(0, n_subpackets):
                (s_decode, sub_used) = decode(subpackets_am, stack)
                subs.append(s_decode)
                used += sub_used
                subpackets_am = subpackets_am[len(sub_used):]
            return subs, used

transmission = data[0].strip()

bits = ""
for c in list(transmission):
    bits += hex_map[c]

print("")
if data == dataA:
    print("VVVTTTAAAAABBBBBCCCCC")
if data == dataB:
    print("VVVTTTILLLLLLLLLLLLLLLAAAAAAAAAAABBBBBBBBBBBBBBBB")
if data == dataC:
    print("VVVTTTILLLLLLLLLLLAAAAAAAAAAABBBBBBBBBBBCCCCCCCCCCC")

syntax = []

decode(bits, stack=syntax)

print(syntax)
print(sum(syntax))


### Rules
# - VVV - first three bits are packet version
# - TTT - next three bits are packet type ID

#### Types
# - 4 - literal
# - other - operator

#### Literal
# - 1/0 - leading bit of each group of 4 (now 5) to say if last or not
# - \d{4} - 4 bits for each word
# - combine words to get literal value in decimal

#### Operator
# - 1/0 - leading bit is length type ID bit
# - 0 - 15 bits for the **total length in bits** of the sub-packets contained in this packet
# - 1 - 11 bits for the **number of sub packets** contained by this packet


