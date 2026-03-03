import {
    checkForLoop,
    countLoops,
    createGraphWithObstacle,
    findStartingPosition,
    isOutOfBounds,
    take,
    turnRight,
    turnRightBitwise,
    walk,
} from "./guard.js";

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

    it("should always turn right (bitwise)", () => {
        const turn = turnRightBitwise(1);
        const dirs = [...take(turn, 8)];
        expect(dirs).toEqual([1, 2, 4, 8, 1, 2, 4, 8]);
    });

    it("should return tgn Try ition", () => {
        const coords = findStartingPosition(sample, "^");
        expect(coords).toEqual([6, 4]);
    });

    it("should be out of bounds", () => {
        expect(isOutOfBounds(sample, [10, 7])).toBe(true);
    });

    it("should walk until it reaches #", () => {
        const startingPosition = findStartingPosition(sample, "^");
        const takeAWalk = [...walk(sample, startingPosition)]; //?
        // console.log(takeAWalk);
        expect(takeAWalk).toEqual([
            [[6, 4], 1],
            [[5, 4], 1],
            [[4, 4], 1],
            [[3, 4], 1],
            [[2, 4], 1],
            [[1, 4], 1],
            [[1, 4], 2],
            [[1, 5], 2],
            [[1, 6], 2],
            [[1, 7], 2],
            [[1, 8], 2],
            [[1, 8], 4],
            [[2, 8], 4],
            [[3, 8], 4],
            [[4, 8], 4],
            [[5, 8], 4],
            [[6, 8], 4],
            [[6, 8], 8],
            [[6, 7], 8],
            [[6, 6], 8],
            [[6, 5], 8],
            [[6, 4], 8],
            [[6, 3], 8],
            [[6, 2], 8],
            [[6, 2], 1],
            [[5, 2], 1],
            [[4, 2], 1],
            [[4, 2], 2],
            [[4, 3], 2],
            [[4, 4], 2],
            [[4, 5], 2],
            [[4, 6], 2],
            [[4, 6], 4],
            [[5, 6], 4],
            [[6, 6], 4],
            [[7, 6], 4],
            [[8, 6], 4],
            [[8, 6], 8],
            [[8, 5], 8],
            [[8, 4], 8],
            [[8, 3], 8],
            [[8, 2], 8],
            [[8, 1], 8],
            [[8, 1], 1],
            [[7, 1], 1],
            [[7, 1], 2],
            [[7, 2], 2],
            [[7, 3], 2],
            [[7, 4], 2],
            [[7, 5], 2],
            [[7, 6], 2],
            [[7, 7], 2],
            [[7, 7], 4],
            [[8, 7], 4],
            [[9, 7], 4],
        ]);

        const uniquePositions = new Set(takeAWalk.map(([[row, col]]) => `${row},${col}`));
        expect(uniquePositions.size).toBe(41);
    });

    it("should create a graph with a new obstacle", () => {
        const newGraph = createGraphWithObstacle(sample, [6, 3]);
        const expected = `....#.....
.........#
..........
..#.......
.......#..
..........
.#.O^.....
........#.
#.........
......#...`.split("\n");
        expect(newGraph).toEqual(expected);
    });

    it("should find a loop", () => {
        const newGraph = createGraphWithObstacle(sample, [6, 3]);

        const loop = checkForLoop(newGraph, [6, 4]);
        expect(loop).toBe(true);
    });

    it("should not find a loop", () => {
        const newGraph = createGraphWithObstacle(sample, [6, 5]);

        const loop = checkForLoop(newGraph, [6, 4]);
        expect(loop).toBe(false);
    });

    it("should count loops", () => {
        const loops = countLoops(sample, [6, 4]);
        expect(loops).toBe(6);
    });
});
