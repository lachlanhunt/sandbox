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

console.log(sum);
