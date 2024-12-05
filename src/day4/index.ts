// cat src/day4/sample | yarn node --loader ts-node/esm src/day4/index.ts
// cat src/day4/input | yarn node --loader ts-node/esm src/day4/index.ts

import { readLines } from "../index";
import { countValidXWordsFromCoords, countWordFromCoords, findLetterCoords } from "./graph";

const graph = await readLines();

const count = countWordFromCoords(graph, findLetterCoords(graph, "X"));

const countXWords = countValidXWordsFromCoords(graph, findLetterCoords(graph, "A"));

console.log("XMAS:", count);
console.log("X-MAS Words:", countXWords);
