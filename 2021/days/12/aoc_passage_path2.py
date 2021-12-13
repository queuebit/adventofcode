#! /usr/local/bin/python3

from graph import Graph
import sys

year = "2021"
day = "12"
problem = "Passage Pathing"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: a rough map of the remaining caves")
print(f"> **Return**: How many paths through this cave system are there that visit small caves at most once?")
print(f"> **NOTE**: Your goal is to find the number of distinct paths that start at start, end at end, and don't visit small caves more than once. There are two types of caves: big caves (written in uppercase, like A) and small caves (written in lowercase, like b). || Each line in the above list corresponds to a single path; the caves visited by that path are listed in the order they are visited and separated by commas.")

data = sys.stdin.readlines()
print(f"{data}")

cx = []
for line in data:
    (f, t) = line.strip().split('-')
    cx.append((f, t))
print(cx)

g = Graph(cx)
print(g)

visited = []
paths = []

g.dfs("start", visited, paths, rules="part2")
print(len(paths))
