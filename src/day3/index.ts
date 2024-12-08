// cat src/day3/sample | yarn node --loader ts-node/esm src/day3/index.ts
// cat src/day3/input | yarn node --loader ts-node/esm src/day3/index.ts

import { readLines } from "../index.js";
import { evaluateMulExpressions, findMulExpressions, splitDoAndDontInstructions } from "./mul.js";

const lines = await readLines();

const line = splitDoAndDontInstructions(lines.join(" "));
const expressions = findMulExpressions(line);
const results = evaluateMulExpressions(expressions);
const sum = results.reduce((acc, cur) => acc + cur, 0);

console.log("Result:", sum);
