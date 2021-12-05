#! /usr/local/bin/python3

import sys

year = "2021"
day = "4"
problem = "Giant Squid"
print(f"--- Day {day}: {problem} ---")
print(f"--- Part Two ---")
print(f"Detailed instructions can be found here: https://adventofcode.com/{year}/day/{day}#part2")

print(f"> **Given**: bingo subsysterm")
print(f"> **Return**: final score of winning board")
print(f"> **NOTE**: squids be crazy")

data = sys.stdin.readlines()

print(f"{data}")
d = [l.strip() for l in data]

call_numbers = []
board = 0
active_board = []
boards = []
for i, l in enumerate(d):
    print(f"{i}:: {l}")

    if i == 0:
        call_numbers = [int(n) for n in l.split(',')]
    elif l == "":
        if len(active_board) > 0:
            boards.append(active_board)
            active_board = []
        board += 1
        print(f"Ready for board #: {board}")
    else:
        active_board.append([int(n.strip()) for n in l.split(' ') if n != ''])

boards.append(active_board)


print(call_numbers)
print(boards)

board_wins = []
for b in boards:
    c = [list(a) for a in zip(*b)]
    board_wins.append(b + c)


winning_boards = []
winners = []
for bi in range(0, len(board_wins)):
    this_board = board_wins[bi]
    for k, cn in enumerate(call_numbers):
        for bwi in range(0, 10):
            board_win_condition = this_board[bwi]
            if cn in board_win_condition:
                board_win_condition.remove(cn)
                spots_needed = [len(w) for w in this_board]
                if 0 in spots_needed:
                    rem = [item for sublist in this_board for item in sublist]
                    rem_uniq = list(set(rem))
                    if cn in rem_uniq:
                        sum_rem = sum(rem_uniq) - cn
                    else:
                        sum_rem = sum(rem_uniq)
                    score = sum_rem * cn
                    win = f"R:{k} Board #{bi+1} wins with {cn} for score ({sum_rem}) of {score}"
                    winners.append(win)
                    winning_boards.append([k, bi+1, cn, sum_rem, score])
                    break
        else:
            continue
        break

print(sorted(winning_boards, key=lambda i: i[0]))


