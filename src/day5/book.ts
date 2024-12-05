export type Rules = Map<number, Set<number>>;
export type Book = number[];

export const processRules = (input: string[]) => {
    const values = input.map((line) => line.split("|").map(Number));
    const groups = Object.groupBy(values, ([n]) => n) as Record<number, number[][]>;

    const entries = Object.entries(groups);

    const result = entries.map<[number, Set<number>]>(([key, value]) => [
        Number(key),
        new Set(value.flatMap<number>(([, page]) => page)),
    ]);

    return new Map(result);
};

export const processPages = (input: string[]) => {
    return input.map((line) => line.split(",").map(Number));
};

function* reverse<T>(arr: T[]): Generator<T> {
    for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i];
    }
}

export const validatePageSequence = (rules: Rules, pages: Book) => {
    let forbidden = new Set<number>();

    for (const page of reverse(pages)) {
        if (forbidden.has(page)) {
            return false;
        }
        forbidden = forbidden.union(rules.get(page) ?? new Set());
    }
    return true;
};

export const getMiddlePage = (pages: Book) => {
    return pages[Math.floor(pages.length / 2)];
};

export const getValidBooks = (rules: Rules, books: Book[]) => {
    return books.filter((book) => validatePageSequence(rules, book));
};

export const getInvalidBooks = (rules: Rules, books: Book[]) => {
    return books.filter((book) => !validatePageSequence(rules, book));
};

export const getMiddlePages = (rules: Rules, books: Book[]) => {
    return books.map(getMiddlePage);
};

export const sortPages = (rules: Rules, pages: Book) => {
    return pages.sort((a, b) => (rules.get(a)?.has(b) ? -1 : 1));
};
