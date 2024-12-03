// cat src/day2/sample | yarn node --loader ts-node/esm src/day2/index.ts
// cat src/day2/input | yarn node --loader ts-node/esm src/day2/index.ts

import { readLines } from "../index";
import { getLevelsFromLines, isReportSafe } from "./reports";

const lines = await readLines();

let safeCount = 0;
for (const levels of getLevelsFromLines(lines)) {
    const isSafe = isReportSafe(levels);

    if (isSafe) {
        safeCount += isReportSafe(levels) ? 1 : 0;
        // console.log(JSON.stringify(levels), "// safe");
    } else {
        // console.log(JSON.stringify(levels), "// unsafe");
    }
}

console.log("Safe Levels:", safeCount);
