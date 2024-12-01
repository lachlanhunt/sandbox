// cat src/day1/sample | yarn node --loader ts-node/esm src/day1/index.ts
// cat src/day1/input |syarn node --loader ts-node/esm src/day1/index.ts

import { readLines } from "../index";

const lines = await readLines();

const numLines = lines.length;
const a = new Array<number>();
const b = new Array<number>();
const c = new Array<number>();

for (const line of lines) {
    const [aStr, bStr] = line.split(/\s+/);
    a.push(Number.parseInt(aStr, 10));
    b.push(Number.parseInt(bStr, 10));
}

a.sort((a, b) => a - b);
b.sort((a, b) => a - b);

for (let i = 0; i < numLines; i++) {
    const aVal = a[i];
    const bVal = b[i];
    c.push(Math.abs(bVal - aVal));
}

const sum = c.reduce((acc, val) => acc + val, 0);

console.log("Sum of differences:", sum);

// Part 2
const counts = new Map<number, number>();
// Count number of occurrences of each number in b
for (const bVal of b) {
    const count = counts.get(bVal) || 0;
    counts.set(bVal, count + 1);
}

// Multiply each number in a by the number of times it occurs in b
let sum2 = 0;
for (const aVal of a) {
    const count = counts.get(aVal) || 0;
    sum2 += aVal * count;
}

console.log("Sum of products:", sum2);
