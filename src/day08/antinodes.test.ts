import {
    calculateAntinodes,
    getAntinodesFromAntennas,
    getUniqueLocations,
    isInBounds,
    LocationMap,
    parseMap,
} from "./antinodes";

const sample = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`.split("\n");

describe("Antinodes", () => {
    it.only("should parse the input", () => {
        const antennas = parseMap(sample);
        expect(antennas.size).toBe(2);
        expect(antennas.get("0")).toEqual([
            [1, 8],
            [2, 5],
            [3, 7],
            [4, 4],
        ]);
        expect(antennas.get("A")).toEqual([
            [5, 6],
            [8, 8],
            [9, 9],
        ]);
    });

    it("should calculate antinodes", () => {
        expect(calculateAntinodes([3, 4], [5, 5])).toEqual([
            [1, 3],
            [7, 6],
        ]);

        expect(calculateAntinodes([5, 5], [3, 4])).toEqual([
            [7, 6],
            [1, 3],
        ]);
    });

    it("should calculate antinodes for the sample", () => {
        const frequencyLocations = parseMap(sample);
        const frequencies = Array.from(frequencyLocations.keys());
        const antinodeMap: LocationMap = new Map();

        for (const frequency of frequencies) {
            const antennas = frequencyLocations.get(frequency);
            if (antennas) {
                const antinodes = getAntinodesFromAntennas(antennas, (coords) => isInBounds(sample, coords));
                antinodeMap.set(frequency, [...antinodes]);
            }
        }

        expect(antinodeMap).toEqual(
            new Map([
                [
                    "0",
                    [
                        [0, 11],
                        [3, 2],
                        [5, 6],
                        [7, 0],
                        [1, 3],
                        [4, 9],
                        [0, 6],
                        [6, 3],
                        [2, 10],
                        [5, 1],
                    ],
                ],
                [
                    "A",
                    [
                        [2, 4],
                        [11, 10],
                        [1, 3],
                        [7, 7],
                        [10, 10],
                    ],
                ],
            ]),
        );
    });

    it("should get the unique antinodes from the sample", () => {
        const frequencyLocations = parseMap(sample);
        const frequencies = Array.from(frequencyLocations.keys());
        const antinodeMap: LocationMap = new Map();

        for (const frequency of frequencies) {
            const antennas = frequencyLocations.get(frequency);
            if (antennas) {
                const antinodes = getAntinodesFromAntennas(antennas, (coords) => isInBounds(sample, coords));
                antinodeMap.set(frequency, [...antinodes]);
            }
        }

        const uniqueAntinodes = getUniqueLocations(antinodeMap);

        expect([...uniqueAntinodes].length).toBe(14);
    });
});
