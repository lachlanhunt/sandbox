// cat src/day4/sample | yarn node --loader ts-node/esm src/day4/index.ts
// cat src/day4/input | yarn node --loader ts-node/esm src/day4/index.ts

import { readLines } from "../index";
import { countWordFromCoords, findXCoords } from "./graph";

const graph = await readLines();

const count = countWordFromCoords(graph, [...findXCoords(graph)]);

console.log("Result:", count);
