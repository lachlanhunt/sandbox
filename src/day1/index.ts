// cat src/day1/input | yarn node --loader ts-node/esm src/day1/index.ts

import { readLines } from "../index";

const lines = await readLines();

const mappedLines = lines.map((line) => {
    // Search for the first digit in the line
    const first = line.search(/\d/);

    // Search for the last digit in the line
    const last = line.search(/\d(?=\D*$)/);

    //    console.log(line, line[first], line[last]);

    return Number.parseInt(`${line[first]}${line[last]}`);
});

const sum = mappedLines.reduce((acc, curr) => acc + curr, 0);

console.log("Sum:", sum);
