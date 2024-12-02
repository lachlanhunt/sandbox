// cat src/day2/sample | yarn node --loader ts-node/esm src/day2/index.ts
// cat src/day2/input | yarn node --loader ts-node/esm src/day2/index.ts

import { readLines } from "../index";

const lines = await readLines();

function* getPairs<T>(arr: T[]): Generator<[T, T]> {
    for (let i = 0; i < arr.length - 1; i++) {
        yield [arr[i], arr[i + 1]];
    }
}

function getLevels(line: string) {
    return line.split(" ").map(Number);
}

function* getLevelsFromLines(lines: string[]) {
    for (let line of lines) {
        yield getLevels(line);
    }
}

export const isRecordSafe = (levels: number[]) => {
    const pairs = getPairs(levels);

    let [a, b] = pairs.next().value;
    let diff = b - a;
    const sign = Math.sign(b - a);
    if (sign === 0 || Math.abs(diff) > 3) return false;

    // Check all levels are ascending or descending
    for (let [a, b] of pairs) {
        diff = b - a;
        // console.log(a, b, diff);
        if (sign !== Math.sign(diff) || Math.abs(diff) > 3) {
            return false;
        }
    }
    return true;
};

let safeCount = 0;
for (const levels of getLevelsFromLines(lines)) {
    const isSafe = isRecordSafe(levels);

    if (isSafe) {
        console.log(levels);
        safeCount += isRecordSafe(levels) ? 1 : 0;
    }
}

console.log("Safe Levels:", safeCount);
