type Graph = string[];
type Direction = (typeof directions)[number];
type Coordinates = [number, number];

const directions = ["N", "E", "S", "W"] as const;

export const createGuard = (graph: Graph) => {
    const startingPosition = findStartingPosition(graph, "^");
    const turn = turnRight();
    // const uniquePositions = new Set<Coordinates>();

    const guard = {
        coords: startingPosition,
        direction: turn.next().value,
        walk() {
            this.coords = nextCoordinatesInDirection(this.coords, this.direction);
        },
        turnRight() {
            this.direction = turn.next().value;
        },
    };

    return guard;
};

export const turnRight = () => repeat(directions);

export function findStartingPosition(graph: Graph, letter: string) {
    const rows = graph.length;

    for (let row = 0; row < rows; row++) {
        const line = graph[row];

        const col = line?.indexOf(letter);

        if (col !== undefined && col !== -1) {
            return [row, col] as Coordinates;
        }
    }
    return [-1, -1] as Coordinates;
}

export const nextCoordinatesInDirection = ([row, col]: Coordinates, direction: Direction): Coordinates => {
    console.log("Getting next coordinates", direction);
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

export const isOutOfBounds = (graph: Graph, [row, col]: Coordinates) => {
    return row < 0 || row >= graph.length || col < 0 || col >= (graph[0]?.length ?? 0);
};

export function* walk(graph: Graph, startingPosition: Coordinates): Generator<Coordinates> {
    let coords = startingPosition;
    const turn = turnRight();
    yield coords;

    for (const direction of turn) {
        while (true) {
            const [row, col] = nextCoordinatesInDirection(coords, direction);

            if (isOutOfBounds(graph, [row, col])) return;

            const char = graph[row]?.[col];
            if (char === "#") {
                break;
            }
            coords = [row, col];
            yield coords;
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
