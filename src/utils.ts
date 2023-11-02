import { type Range } from "./timerange";

function compareRanges(a: Range, b: Range) {
    return a.start - b.start;
}

// Generate an array of random time ranges representing periods of tiem over the course of a month
// All ranges should be in the range from Date.now() up to 5 days in the future,
// where each range has a maximum duration of 8 hours.
function generateRandomTimeRanges(numRanges: number): Range[] {
    const ranges: Range[] = [];
    const now = Date.now();
    for (let i = 0; i < numRanges; i++) {
        const start = Math.round(now + Math.random() * 5 * 24 * 60 * 60 * 1000);
        const end = Math.round(start + Math.random() * 8 * 60 * 60 * 1000);
        ranges.push({ start, end });
    }
    return ranges;
}

const ranges = generateRandomTimeRanges(10); //?
ranges.sort(compareRanges);

console.log(
    ranges.map(({ start, end }) => ({
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
    }))
); //?
