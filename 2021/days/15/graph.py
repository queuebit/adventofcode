from collections import defaultdict
import re

## Starting point for Graph class
### https://stackoverflow.com/a/30747003/1217

class Graph(object):
    """ Graph data structure, undirected by default. """

    def __init__(self, connections, directed=False):
        self._graph = defaultdict(set)
        self._directed = directed
        self.add_connections(connections)

    def add_connections(self, connections):
        """ Add connections (list of tuple pairs) to graph """

        for node1, node2 in connections:
            self.add(node1, node2)

    def add(self, node1, node2):
        """ Add connection between node1 and node2 """

        self._graph[node1].add(node2)
        if not self._directed:
            self._graph[node2].add(node1)

    def remove(self, node):
        """ Remove all references to node """

        for n, cxns in self._graph.items():
            try:
                cxns.remove(node)
            except KeyError:
                pass

        try:
            del self._graph[node]
        except KeyError:
            pass

    def is_connected(self, node1, node2):
        """ Is node1 directly connected to node2 """

        return node1 in self._graph and node2 in self._graph[node1]

    def find_path(self, node1, node2, path=[]):
        """ Find any path between node1 and node2 (may not be the shortest) """

        path = path + [node1]
        if node1 == node2:
            return path
        if node1 not in self._graph:
            return None
        for node in self._graph[node1]:
            if node not in path:
                new_path = self.find_path(node, node2, path)
                if new_path:
                    return new_path

        return None

    def minor_node(self, node):
        return bool(re.match(r"^[a-z]+$", node))

    def major_node(self, node):
        return not self.minor_node(node)

    def a_minor_node_twice(self, path):
        for node in path:
            if self.minor_node(node) and path.count(node) >= 2:
                return node
        return False

    def dfs(self, node, visited, paths, rules="part1", end_node="end"):
        #print(visited, paths)
        visited.append(node)

        if (node == end_node):
            paths.append(",".join(visited))
            return

        for n in self._graph[node]:
            if n == "start":
                continue
            
            if rules == "part1" and self.minor_node(n) and n in visited:
                continue
            elif rules == "part2" and self.minor_node(n) and n in visited and self.a_minor_node_twice(visited):
                continue
            elif rules == "15part1" and n in visited:
                continue
            else:
                self.dfs(n, visited[:], paths, rules=rules, end_node=end_node)

    ## https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode
    def dijkstra(self, length, source="0|0"):
        q = set()
        dist = {}
        prev = {}

        BIG = 1*10**10

        directions = {
                "N": [-1, 0],
                "E": [0, 1],
                "S": [1, 0],
                "W": [0, -1],
                }

        print(self._graph)
        for v in self._graph:
            dist[v] = [v, BIG]
            prev[v] = None
            q.add(v)
        dist[source] = [source, 0]

        while len(q) > 0:
            up = min(dist.values(), key=lambda dp: dp[1] if dp[0] in q else BIG)
            # print(up)
            [u, ud] = up
            [ux, uy] = [int(dig) for dig in u.split('|')]

            q.remove(u)

            # for each neighbor v of u still in Q:
            for vd in ["N", "E", "S", "W"]:
                [dx, dy] = directions[vd]
                [vx, vy] = [ux + dx, uy + dy]
                v = f"{vx}|{vy}"

                if v not in q and v not in self._graph:
                    continue

                alt = dist[u][1] + length[v]
                if alt < dist[v][1]:
                    dist[v] = [v, alt]
                    prev[v] = u

        return dist, prev

    def min_path(self, prev=[], source="0|0", target="9|9"):
        s = []
        u = target

        if prev[u] or u == source:
            while u:
                s.append(u)
                u = prev[u]

        return s

    def __str__(self):
        return f"Graph({dict(self._graph)})"
