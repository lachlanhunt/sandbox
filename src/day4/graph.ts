type Graph = string[];
type Direction = (typeof directions)[number];
type Coordinates = [number, number];

const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
const SEARCH_WORD = "XMAS";
const VALID_WORDS = ["SAM", "MAS"];

export function* findLetterCoords(graph: Graph, letter: string): Generator<Coordinates, void, unknown> {
    let rows = graph.length;

    for (let row = 0; row < rows; row++) {
        const line = graph[row];
        let col = -1;

        while ((col = line.indexOf(letter, col + 1)) !== -1) {
            yield [row, col];
        }
    }
}

export const nextCoordinatesInDirection = ([row, col]: Coordinates, direction: Direction): Coordinates => {
    switch (direction) {
        case "N":
            return [row - 1, col];
        case "NE":
            return [row - 1, col + 1];
        case "E":
            return [row, col + 1];
        case "SE":
            return [row + 1, col + 1];
        case "S":
            return [row + 1, col];
        case "SW":
            return [row + 1, col - 1];
        case "W":
            return [row, col - 1];
        case "NW":
            return [row - 1, col - 1];
    }
};

export const isOutOfBounds = (graph: Graph, [row, col]: Coordinates) => {
    return row < 0 || row >= graph.length || col < 0 || col >= graph[0].length;
};

export function* coordinatesFromDirection(graph: Graph, [row, col]: Coordinates, direction: Direction) {
    let coords: Coordinates = [row, col];

    do {
        if (isOutOfBounds(graph, coords)) {
            break;
        }
        yield coords;
    } while ((coords = nextCoordinatesInDirection(coords, direction)));
}

function* take<T>(iterable: Iterable<T>, n: number): Generator<T> {
    let i = 0;
    let iterator = iterable[Symbol.iterator]();
    while (i < n) {
        const next = iterator.next();
        if (next.done) {
            break;
        }
        yield next.value;
        i++;
    }
}

export const countWordFromCoords = (graph: Graph, coords: Iterable<Coordinates>) => {
    let length = SEARCH_WORD.length;
    let count = 0;
    // Starting from the coordinates, get the sequence of coordinates in the direction
    for (const coordinate of coords) {
        coordinate;
        for (const direction of directions) {
            const coordsInDirection = take(coordinatesFromDirection(graph, coordinate, direction), length);
            const word = [...coordsInDirection].map(([row, col]) => graph[row][col]).join("");

            if (word === SEARCH_WORD) {
                count++;
            }
        }
    }
    return count;
};

export const getDiagonalWordsFromCoords = (graph: Graph, coordinates: Coordinates) => {
    const adjacentDiagonals: Direction[] = ["NE", "SW", "NW", "SE"];
    const [r, c] = coordinates;

    const adjacentLetters = adjacentDiagonals.reduce((accum, direction) => {
        const coordsInDirection = take(coordinatesFromDirection(graph, coordinates, direction), 2);
        const list = [...coordsInDirection];
        const letters = list.map(([row, col]) => graph[row][col]); //?
        const letter = letters[1] ?? "";
        //     ^?
        accum.set(direction, letter);
        return accum;
    }, new Map<Direction, string>());

    const centralLetter = graph[r][c];

    return [
        adjacentLetters.get("NE") + centralLetter + adjacentLetters.get("SW"),
        adjacentLetters.get("NW") + centralLetter + adjacentLetters.get("SE"),
    ];
};

export const validateXWords = (words: string[], validWords: string[]) => {
    return words.every((word) => validWords.includes(word));
};

export const countValidXWordsFromCoords = (graph: Graph, coords: Iterable<Coordinates>) => {
    let count = 0;
    for (const coordinate of coords) {
        const words = getDiagonalWordsFromCoords(graph, coordinate);
        if (validateXWords(words, VALID_WORDS)) {
            count++;
        }
    }
    return count;
};
