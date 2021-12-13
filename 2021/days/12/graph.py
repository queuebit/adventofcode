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

    def dfs(self, node, visited, paths, rules="part1"):
        #print(visited, paths)
        visited.append(node)

        if (node == "end"):
            paths.append(",".join(visited))
            return

        for n in self._graph[node]:
            if n == "start":
                continue
            
            if rules == "part1" and self.minor_node(n) and n in visited:
                continue
            elif rules == "part2" and self.minor_node(n) and n in visited and self.a_minor_node_twice(visited):
                continue
            else:
                self.dfs(n, visited[:], paths, rules=rules)


    def __str__(self):
        return f"Graph({dict(self._graph)})"
