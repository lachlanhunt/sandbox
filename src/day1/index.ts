// cat src/day1/input | yarn node --loader ts-node/esm src/day1/index.ts

import { readLines } from "../index";

const lines = await readLines();

const wordToDigit = (word: string) => {
    if (word.match(/\d/)) {
        return word;
    }
    return `${["ne", "wo", "hree", "four", "five", "six", "seven", "ight", "ine"].indexOf(word) + 1}`;
};

const mappedLines = lines.map((line) => {
    const matches = line.matchAll(/(?<=o)ne|(?<=t)wo|(?<=t)hree|four|five|six|seven|(?<=e)ight|(?<=n)ine|\d/g);
    const allMatches = [...matches];

    const mappedAllMatches = allMatches.map((match) => wordToDigit(match[0]));

    const firstMatch = mappedAllMatches.at(0) ?? "";
    const lastMatch = mappedAllMatches.at(-1) ?? "";

    const result = Number.parseInt(`${firstMatch}${lastMatch}`);

    // console.log(line, result);

    return result;
});

const sum = mappedLines.reduce((acc, curr) => acc + curr, 0);

console.log("Sum:", sum);
