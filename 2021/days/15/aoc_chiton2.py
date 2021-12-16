#! /usr/local/bin/python3

from collections import Counter
import sys

from graph import Graph

year = "2021"
day = "15"
problem = "Chiton"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: a map of risk level throughout the cave")
print(f"> **Return**: What is the lowest total risk of any path from the top left to the bottom right?")
print(f"> **NOTE**: don't count the risk level of your starting position unless you enter it; leaving it adds no risk to your total")

data = sys.stdin.readlines()
print(f"{data}")

risk_map = {}
connections = []

dimx = len(data)
dimy = len(data[0].strip())

boost = 5

for r, line in enumerate(data):
    row = line.strip()
    for c, val in enumerate(row):
        for i in range(0, boost):
            for j in range(0, boost):
                x = r + i * dimx
                y = c + j * dimy
                v = int(val) + i + j
                mv = v % 9 if v > 9 else v
                risk_id = f"{x}|{y}"
                risk_map[risk_id] = mv
                neighbors = []
                
                # north neighbor
                if x > 0:
                    neighbors.append(f"{x-1}|{y}")

                # east neighbor
                if y < len(row) - 1:
                    neighbors.append(f"{x}|{y+1}")

                # south neighbor
                if x < len(data) - 1:
                    neighbors.append(f"{x+1}|{y}")

                # west neighbor
                if y > 0:
                    neighbors.append(f"{x}|{y-1}")

                for n in neighbors:
                    connections.append((risk_id, n))

for i in range(0, dimx * boost):
    dr = []
    for j in range(0, dimy * boost):
        f = f"{i}|{j}"
        dr.append(risk_map[f])
    print("".join([str(d) for d in dr]))
        
start_at = "0|0"
end_at = f"{dimx*boost - 1}|{dimy*boost - 1}"


g = Graph(connections, directed=True)
#print(g.find_path(start_at, end_at))

visited = []
paths = []

#g.dfs("0|0", visited, paths, rules="15part1", end_node=end_at)
#print(len(paths))
#print(min([sum([risk_map[cell] for cell in path.split(",")]) for path in paths]) - 1)

print()
print()
[dist, prev] = g.dijkstra_pq(risk_map, source="0|0")
print(dist, prev)
print(f"EA: {end_at}")
print(f"DIST: {dist[end_at]}")
print()
print()
#min_path = g.min_path(prev, target=end_at)
#print(sum([risk_map[cell] for cell in min_path]) - risk_map[start_at])
#print(min([sum([risk_map[cell] for cell in path.split(",")]) for path in paths]) - 1)


