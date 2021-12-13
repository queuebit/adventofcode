from collections import defaultdict

## Starting point for Graph class
### https://stackoverflow.com/a/30747003/1217

class Graph(object):
    """ Graph data structure, undirected by default. """

    def __init__(self, connections, directed=False):
        print("init")

    def add_connections(self, connections):
        """ Add connections (list of tuple pairs) to graph """
        print("connections")

    def add(self, node1, node2):
        """ Add connection between node1 and node2 """
        print("add")

    def remove(self, node):
        """ Remove all references to node """
        print("remove")

    def is_connected(self, node1, node2):
        """ Is node1 directly connected to node2 """
        print("is_connected")

    def find_path(self, node1, node2, path=[]):
        """ Find any path between node1 and node2 """
        print("find_path")

    def __str__(self):
        return f"Graph({dict(self._graph)})"
