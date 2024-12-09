import { describe, expect, test } from "vitest";
import {
    nextCoordinatesInDirection,
    findLetterCoords,
    coordinatesFromDirection,
    isOutOfBounds,
    countWordFromCoords,
    getDiagonalWordsFromCoords,
    validateXWords,
    countValidXWordsFromCoords,
} from "./graph";

const sample = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.split("\n");

describe("Find a Word", () => {
    test("should yield coordinates of X in sample", () => {
        const coords = [...findLetterCoords(sample, "X")];
        expect(coords).toEqual([
            [0, 4],
            [0, 5],
            [1, 4],
            [2, 2],
            [2, 4],
            [3, 9],
            [4, 0],
            [4, 6],
            [5, 0],
            [5, 1],
            [5, 5],
            [5, 6],
            [6, 7],
            [7, 2],
            [8, 5],
            [9, 1],
            [9, 3],
            [9, 5],
            [9, 9],
        ]);
    });

    test("should calculate coordinates in direction", () => {
        // [0, 4] -> [0, 3]
        expect(nextCoordinatesInDirection([0, 4], "W")).toEqual([0, 3]);
        // [0, 4] -> [1, 4]
        expect(nextCoordinatesInDirection([0, 4], "S")).toEqual([1, 4]);
        // [0, 4] -> [1, 5]
        expect(nextCoordinatesInDirection([0, 4], "SE")).toEqual([1, 5]);
        // [10,15] -> [9, 15]
        expect(nextCoordinatesInDirection([10, 15], "N")).toEqual([9, 15]);
    });

    test("should calculate coordinates in direction", () => {
        const coords = coordinatesFromDirection(sample, [5, 4], "NE");
        expect(coords.next().value).toEqual([5, 4]);
        expect(coords.next().value).toEqual([4, 5]);
        expect(coords.next().value).toEqual([3, 6]);
        expect(coords.next().value).toEqual([2, 7]);
        expect(coords.next().value).toEqual([1, 8]);
    });

    test("should filter out of bounds coordinates", () => {
        const coords = [...coordinatesFromDirection(sample, [3, 4], "NE")];
        expect(coords).toEqual([
            [3, 4],
            [2, 5],
            [1, 6],
            [0, 7],
        ]);
    });

    test("should count the word from coordinates", () => {
        const count = countWordFromCoords(sample, [
            [0, 5],
            [4, 6],
        ]);
        expect(count).toEqual(3);
    });

    test("should count all the words in sample", () => {
        const count = countWordFromCoords(sample, findLetterCoords(sample, "X"));
        expect(count).toEqual(18);
    });

    test("should get diagonal words from sample", () => {
        const diagonalWords = getDiagonalWordsFromCoords(sample, [1, 2]);
        expect(diagonalWords).toEqual(["SAM", "MAS"]);
    });

    test("should validate X-words", () => {
        const words = ["SAM", "MAS"];
        const validWords = ["SAM", "MAS"];
        expect(validateXWords(words, validWords)).toEqual(true);
    });

    test("should invalidate X-words", () => {
        const words = ["MAM", "MAS"];
        const validWords = ["SAM", "MAS"];
        expect(validateXWords(words, validWords)).toEqual(false);
    });

    test("should count valid X-words in sample", () => {
        const count = countValidXWordsFromCoords(sample, findLetterCoords(sample, "A"));
        expect(count).toEqual(9);
    });
});
