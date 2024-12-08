type Graph = string[];
type Direction = (typeof directions)[number];
type Coordinates = [number, number];
type DirectionBitwise = 0b0001 | 0b0010 | 0b0100 | 0b1000;

const directions = ["N", "E", "S", "W"] as const;

export const turnRight = () => repeat(directions);

export function* turnRightBitwise(initialDirection: DirectionBitwise): Generator<DirectionBitwise, never, void> {
    let current = initialDirection;
    while (true) {
        yield current;
        current = nextDirectionBitwise(current);
    }
}

export const nextDirectionBitwise = (direction: DirectionBitwise) => {
    return ((direction << 1) % 16 || 1) as DirectionBitwise;
};

export function findStartingPosition(graph: Graph, letter: string) {
    const rows = graph.length;

    for (let row = 0; row < rows; row++) {
        const line = graph[row];

        const col = line.indexOf(letter);

        if (col !== -1) {
            return [row, col] as Coordinates;
        }
    }
    return [-1, -1] as Coordinates;
}

export const nextCoordinatesInDirection = ([row, col]: Coordinates, direction: Direction): Coordinates => {
    switch (direction) {
        case "N":
            return [row - 1, col];
        case "E":
            return [row, col + 1];
        case "S":
            return [row + 1, col];
        case "W":
            return [row, col - 1];
    }
};

export const nextCoordinatesInDirectionBitwise = (
    [row, col]: Coordinates,
    direction: DirectionBitwise,
): Coordinates => {
    switch (direction) {
        case 0b0001:
            return [row - 1, col];
        case 0b0010:
            return [row, col + 1];
        case 0b0100:
            return [row + 1, col];
        case 0b1000:
            return [row, col - 1];
    }
};

export const isOutOfBounds = (graph: Graph, [row, col]: Coordinates) => {
    return row < 0 || row >= graph.length || col < 0 || col >= (graph[0]?.length ?? 0);
};

export function* walk(
    graph: Graph,
    startingPosition: Coordinates,
    initialDirection: DirectionBitwise = 1,
): Generator<[Coordinates, DirectionBitwise]> {
    let coords = startingPosition;
    const turn = turnRightBitwise(initialDirection);
    // yield [coords, initialDirection];

    for (const direction of turn) {
        while (true) {
            yield [coords, direction];
            const [row, col] = nextCoordinatesInDirectionBitwise(coords, direction);

            if (isOutOfBounds(graph, [row, col])) return;

            const char = graph[row]?.[col];
            if (!(char === "." || char === "^")) {
                break;
            }
            coords = [row, col];
        }
    }
}

export function* take<T>(iterable: Iterable<T>, n: number): Generator<T> {
    let i = 0;
    const iterator = iterable[Symbol.iterator]();
    while (i < n) {
        const next = iterator.next();
        if (next.done) {
            break;
        }
        yield next.value;
        i++;
    }
}

export function* repeat<T = unknown>(iterable: Iterable<T>): Generator<T, never, void> {
    while (true) {
        for (const item of iterable) {
            yield item;
        }
    }
}

export const createGraphWithObstacle = (graph: Graph, [row, col]: Coordinates) => {
    const newGraph = [...graph];
    newGraph[row] = newGraph[row].slice(0, col) + "O" + newGraph[row].slice(col + 1); //?
    return newGraph;
};

export const checkForLoop = (graph: Graph, startingPosition: Coordinates) => {
    const length = graph.length;
    const width = graph[0].length;

    const takeAWalk = walk(graph, startingPosition);

    // Keep track of where we've been
    const trackingGraph = new Array<DirectionBitwise | 0>(length * width).fill(0);

    for (const [coords, direction] of takeAWalk) {
        const [row, col] = coords;
        const index = row * width + col;
        if (trackingGraph[index] & direction) {
            return true;
        }
        trackingGraph[index] |= direction;
    }
    return false;
};

export const countLoops = (graph: Graph, startingPosition: Coordinates) => {
    const takeAWalk = walk(graph, startingPosition);
    let loops = 0;
    const uniquePositions = new Set<string>([startingPosition.join(",")]);

    for (const [coords] of takeAWalk) {
        if (uniquePositions.has(coords.join(","))) continue;
        const newGraph = createGraphWithObstacle(graph, coords);

        const isLoop = checkForLoop(newGraph, startingPosition);
        if (isLoop) {
            loops++;
        }
        uniquePositions.add(coords.join(","));
    }
    return loops;
};
