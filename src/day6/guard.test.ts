import { findStartingPosition, isOutOfBounds, take, turnRight, walk } from "./guard.js";

// ^ indicates the starting position
const sample = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.split("\n");

describe("Guard", () => {
    it("should always turn right", () => {
        const turn = turnRight();

        const dirs = [...take(turn, 8)];

        expect(dirs).toEqual(["N", "E", "S", "W", "N", "E", "S", "W"]);
    });

    it("should return the starting position", () => {
        const coords = findStartingPosition(sample, "^");
        expect(coords).toEqual([6, 4]);
    });

    it("should be out of bounds", () => {
        expect(isOutOfBounds(sample, [10, 7])).toBe(true);
    });

    it("should walk until it reaches #", () => {
        const startingPosition = findStartingPosition(sample, "^");
        const takeAWalk = [...walk(sample, startingPosition)]; //?

        expect(takeAWalk).toEqual([
            [6, 4],
            [5, 4],
            [4, 4],
            [3, 4],
            [2, 4],
            [1, 4],
            [1, 5],
            [1, 6],
            [1, 7],
            [1, 8],
            [2, 8],
            [3, 8],
            [4, 8],
            [5, 8],
            [6, 8],
            [6, 7],
            [6, 6],
            [6, 5],
            [6, 4],
            [6, 3],
            [6, 2],
            [5, 2],
            [4, 2],
            [4, 3],
            [4, 4],
            [4, 5],
            [4, 6],
            [5, 6],
            [6, 6],
            [7, 6],
            [8, 6],
            [8, 5],
            [8, 4],
            [8, 3],
            [8, 2],
            [8, 1],
            [7, 1],
            [7, 2],
            [7, 3],
            [7, 4],
            [7, 5],
            [7, 6],
            [7, 7],
            [8, 7],
            [9, 7],
        ]);

        const uniquePositions = new Set(takeAWalk.map(([row, col]) => `${row},${col}`));
        expect(uniquePositions.size).toBe(41);
    });
});
