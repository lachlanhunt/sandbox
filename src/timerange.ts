export type Range = {
    start: number;
    end: number;
};

export function collateTimeRanges(...ranges: Range[][]) {
    let collated: Range[] = [];
    collated = collated.concat(...ranges);
    collated.sort(compareRanges);

    // Combine overlapping ranges into a single range
    return collated.reduce((acc: Range[], range: Range) => {
        const lastRange = acc[acc.length - 1];
        if (lastRange && range.start <= lastRange.end) {
            lastRange.end = Math.max(lastRange.end, range.end);
        } else {
            acc.push({ ...range });
        }
        return acc;
    }, []);
}

export function compareRanges(a: Range, b: Range) {
    return a.start - b.start;
}
