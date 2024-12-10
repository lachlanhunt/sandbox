// cat src/day07/sample | yarn node --loader ts-node/esm src/day07/index.ts
// cat src/day07/input | yarn node --loader ts-node/esm src/day07/index.ts

import { readLines } from "../index.js";
import { sumValidCalibrations, processLine } from "./maths.js";

const input = await readLines();

const calibrations = input.map(processLine);

const part2 = sumValidCalibrations(calibrations);

console.log("Part 2 Result:", part2);
/**/
