import { describe, expect, test } from "vitest";
import { isReportSafe } from "./index";

describe("isReportSafe", () => {
    test("should check for safe levels", () => {
        // Add your tests here
        const isSafe = isReportSafe([1, 2, 3, 4, 5]);
        expect(isSafe).toBe(true);
    });
});
