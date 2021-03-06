#! /usr/local/bin/python3

from collections import Counter
import sys

from graph import Graph

year = "2021"
day = "15"
problem = "Chiton"
print(f"--- Day {day}: {problem} ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}")

print(f"> **Given**: a map of risk level throughout the cave")
print(f"> **Return**: What is the lowest total risk of any path from the top left to the bottom right?")
print(f"> **NOTE**: don't count the risk level of your starting position unless you enter it; leaving it adds no risk to your total")

data = sys.stdin.readlines()
print(f"{data}")

risk_map = {}
connections = []
for r, line in enumerate(data):
    row = line.strip()
    for c, val in enumerate(row):
        risk_id = f"{r}|{c}"
        risk_map[risk_id] = int(val)
        neighbors = []
        
        # north neighbor
        if r > 0:
            neighbors.append(f"{r-1}|{c}")

        # east neighbor
        if c < len(row) - 1:
            neighbors.append(f"{r}|{c+1}")

        # south neighbor
        if r < len(data) - 1:
            neighbors.append(f"{r+1}|{c}")

        # west neighbor
        if c > 0:
            neighbors.append(f"{r}|{c-1}")

        for n in neighbors:
            connections.append((risk_id, n))

start_at = "0|0"
end_at = f"{len(data) - 1}|{len(data[0].strip()) - 1}"


g = Graph(connections, directed=True)
#print(g.find_path(start_at, end_at))

visited = []
paths = []

#g.dfs("0|0", visited, paths, rules="15part1", end_node=end_at)
#print(len(paths))
#print(min([sum([risk_map[cell] for cell in path.split(",")]) for path in paths]) - 1)

print()
print()
[dist, prev] = g.dijkstra(risk_map, source="0|0")
#print(dist, prev)
print()
print()
min_path = g.min_path(prev, target=end_at)
print(min_path)
print(sum([risk_map[cell] for cell in min_path]) - risk_map[start_at])
#print(min([sum([risk_map[cell] for cell in path.split(",")]) for path in paths]) - 1)


