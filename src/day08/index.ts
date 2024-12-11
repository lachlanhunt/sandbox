// cat src/day08/sample | yarn node --loader ts-node/esm src/day08/index.ts
// cat src/day08/input | yarn node --loader ts-node/esm src/day08/index.ts

import { readLines } from "../index.js";
import { getAntinodesFromAntennas, getUniqueLocations, isInBounds, LocationMap, parseMap } from "./antinodes.js";

const input = await readLines();

const frequencyLocations = parseMap(input);
const frequencies = Array.from(frequencyLocations.keys());
const antinodeMap: LocationMap = new Map();

for (const frequency of frequencies) {
    const antennas = frequencyLocations.get(frequency);
    if (antennas) {
        const antinodes = getAntinodesFromAntennas(antennas, (coords) => isInBounds(input, coords));
        antinodeMap.set(frequency, [...antinodes]);
    }
}

const uniqueAntinodes = getUniqueLocations(antinodeMap);

console.log("Part 1 Result:", [...uniqueAntinodes].length);
