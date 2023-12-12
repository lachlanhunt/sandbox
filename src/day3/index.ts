// cat src/day3/input | yarn node --loader ts-node/esm src/day3/index.ts

import { readLines } from "../index";

const input = await readLines();

const findOccurrences = (regex: RegExp, lines: string[]) =>
    lines.flatMap((str, line) =>
        [...str.matchAll(regex)].map((match) => ({
            value: match[0],
            line,
            position: match.index!,
            length: match[0].length,
        }))
    );

const candidateParts = findOccurrences(/\d+/g, input);

const symbols = findOccurrences(/[^.\d]/g, input);

const groupedSymbols = symbols.reduce((acc, symbol) => {
    const group = acc[symbol.line] ?? [];
    group.push(symbol);
    acc[symbol.line] = group;
    return acc;
}, {} as { [index: number]: ReturnType<typeof findOccurrences> });

console.log(candidateParts);
console.log(groupedSymbols);

const validParts = candidateParts.filter((part) => {
    const { line, position: partPosition, length } = part;

    for (let i = line - 1; i <= line + 1; i++) {
        const group = groupedSymbols[i];
        if (!group) continue;
        for (const symbol of group) {
            if (symbol.position >= partPosition - 1 && symbol.position <= partPosition + length) {
                return true;
            }
        }
    }
    return false;
});

console.log(validParts);

const partNumbers = validParts.map(({ value }) => +value);

const sum = partNumbers.reduce((acc, curr) => acc + curr, 0);

console.log("Sum:", sum);
