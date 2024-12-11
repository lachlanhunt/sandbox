export type Frequency = string & {};
export type Coordinates = [number, number];
export type Locations = Coordinates[] | Iterable<Coordinates>;
export type UniqueLocations = Set<string>;
export type LocationMap = Map<Frequency, Locations>;

export const parseMap: (map: Frequency[]) => LocationMap = (input) => {
    const frequencyLocations: LocationMap = new Map();
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            const frequency = input[row][col];
            if (frequency === ".") {
                continue;
            }
            const antennas = (frequencyLocations.get(frequency) ?? []) as Coordinates[];
            antennas.push([row, col]);
            frequencyLocations.set(frequency, antennas);
        }
    }
    return frequencyLocations;
};

const isArray = <T>(value: unknown): value is T[] => Array.isArray(value);

export function* combination<T>(set: ArrayLike<T> | Iterable<T>, size: number) {
    const src = isArray<T>(set) ? set : Array.from(set);

    // Clamp value between 1 and the length of the source array.
    // Default to the source length if size is outside that range.
    const n = Math.min(Math.max(+size, 0) || src.length, src.length);
    const m = n - 1;

    // const seq = [...take(counter(), n)]; // Sequence
    const seq = Array.from({ length: n }, (_, i) => i); // Sequence

    const maxValueAt = (index: number) => src.length - seq.length + index;

    let i = m;
    while (i >= 0) {
        while (i < m) {
            i++;
            seq[i] = seq[i - 1] + 1;
        }

        while (seq[i] < src.length) {
            yield seq.map((v) => src[v]);
            seq[i]++;
        }

        while (--i >= 0 && seq[i] > maxValueAt(i));

        if (i >= 0) seq[i]++;
    }
}

export const calculateAntinodes = ([x1, y1]: Coordinates, [x2, y2]: Coordinates): [Coordinates, Coordinates] => {
    const dx = x2 - x1;
    const dy = y2 - y1;

    const antinode1: Coordinates = [x1 - dx, y1 - dy];
    const antinode2: Coordinates = [x2 + dx, y2 + dy];

    return [antinode1, antinode2];
};

export const isOutOfBounds = (map: Frequency[], [row, col]: Coordinates) => {
    return row < 0 || row >= map.length || col < 0 || col >= map[0].length;
};

export const isInBounds = (map: Frequency[], [row, col]: Coordinates) => {
    return !isOutOfBounds(map, [row, col]);
};

export function* getAntinodesFromAntennas(antennas: Locations, predicate: (value: Coordinates) => boolean) {
    for (const [antenna1, antenna2] of combination(antennas, 2)) {
        const [a, b] = calculateAntinodes(antenna1, antenna2);
        if (predicate(a)) yield a;
        if (predicate(b)) yield b;
    }
}

export function* getUniqueLocations(antinodeMap: LocationMap) {
    const uniqueLocations = new Set();

    for (const locations of antinodeMap.values()) {
        for (const coordinates of locations) {
            const key = coordinates.join(",");
            const hasKey = uniqueLocations.has(key);
            if (!hasKey) {
                uniqueLocations.add(key);
                yield coordinates;
            }
        }
    }
}
