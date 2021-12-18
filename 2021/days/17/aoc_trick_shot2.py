#! /usr/local/bin/python3

import re
import sys

year = "2021"
day = "17"
problem = "Trick Shot"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: calculated this target area")
print(f"> **Return**: How many distinct initial velocity values cause the probe to be within the target area after any step?")
print(f"> **NOTE**: ")

data = sys.stdin.readlines()
print(f"{data}")

tar_text = data[0].strip()
# target area: x=20..30, y=-10..-5
target_r = r"target area: x=(\d+)\.\.(\d+), y=(\-?\d+)..(\-?\d+)"
target_match = re.search(target_r, tar_text)

x1 = int(target_match.group(1))
x2 = int(target_match.group(2))
y1 = int(target_match.group(3))
y2 = int(target_match.group(4))

velocity = (7, 2) # Height = 3
velocity = (6, 3) # Height = 6
velocity = (9, 0) # Height = 0
velocity = (17, -4) # Height = N/A
velocity = (6, 9) # Height = 45

print(f"X={[x1, x2]}, Y={[y1, y2]}")
target_range = [(x,y) for x in range(x1, x2 + 1) for y in range(y1, y2 + 1)]
past_pos = (x2, y1)
print(target_range)

def experiment(v_init, past_pos, observations={}, velocities=set()):
    probe_at = (0, 0)
    positions = [probe_at]
    steps = 1000
    velocity = v_init 
    (pastx, pasty) = past_pos

    for s in range(0, steps):
        (vx, vy) = velocity
        (px, py) = probe_at

        # The probe's x position increases by its x velocity.
        # The probe's y position increases by its y velocity.
        px += vx
        py += vy

        # Due to drag, the probe's x velocity changes by 1 toward the value 0; that is, it decreases by 1 if it is greater than 0, increases by 1 if it is less than 0, or does not change if it is already 0.
        if vx > 0:
            vx -= 1
        elif vx < 0:
            vx += 1

        # Due to gravity, the probe's y velocity decreases by 1.
        vy -= 1

        velocity = (vx, vy)
        probe_at = (px, py)
        positions.append(probe_at)

        if px > pastx or py < pasty:
            return

        if probe_at in target_range:
            #print(f"PROBE MADE IT, at step: {s} and position: {probe_at}")
            max_height = max(positions, key=lambda pxy: pxy[1])[1]
            #print(f"MAX HEIGHT: {max_height}")
            velocities.add(v_init)
            observations[max_height] = v_init

gx = x2 + 1
gy = abs(int(y1)) + 1
rx = [0, gx]
ry = [-gy, gy]
guesses = [(vx, vy) for vx in range(*rx) for vy in range(*ry)]

observations = {}
velocities = set()

for vg in guesses:
    experiment(vg, past_pos, observations, velocities)

print(observations.keys())
max_obs = max(observations.keys())
print(max_obs)

print(velocities)
print(len(list(velocities)))
