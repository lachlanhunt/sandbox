import { describe, expect, test } from "vitest";
import { isReportSafe } from "./reports";

describe("isReportSafe", () => {
    test("should check for safe levels", () => {
        const isSafe = isReportSafe([1, 2, 3, 4, 5]);
        expect(isSafe).toBe(true);
    });

    // [7, 6, 4, 2, 1] // Safe without removing any level.

    test("should check for safe levels sample 1", () => {
        const isSafe = isReportSafe([7, 6, 4, 2, 1]);
        expect(isSafe).toBe(true);
    });

    // [1, 2, 7, 8, 9] // Unsafe regardless of which level is removed.
    test("should check for safe levels sample 2", () => {
        const isSafe = isReportSafe([1, 2, 7, 8, 9]);
        expect(isSafe).toBe(false);
    });

    // [9, 7, 6, 2, 1] // Unsafe regardless of which level is removed.
    test("should check for safe levels sample 3", () => {
        const isSafe = isReportSafe([9, 7, 6, 2, 1]);
        expect(isSafe).toBe(false);
    });

    // [1, 3, 2, 4, 5] // Safe by removing the second level, 3.
    test("should check for safe levels sample 4", () => {
        const isSafe = isReportSafe([1, 3, 2, 4, 5]);
        expect(isSafe).toBe(true);
    });

    // [8, 6, 4, 4, 1] // Safe by removing the third level, 4.
    test("should check for safe levels sample 5", () => {
        const isSafe = isReportSafe([8, 6, 4, 4, 1]);
        expect(isSafe).toBe(true);
    });

    // [1, 3, 6, 7, 9] // Safe without removing any level.
    test("should check for safe levels sample 6", () => {
        const isSafe = isReportSafe([1, 3, 6, 7, 9]);
        expect(isSafe).toBe(true);
    });

    test("should check for safe levels, extra 1", () => {
        const isSafe = isReportSafe([1, 9, 8, 7, 6, 5]);
        expect(isSafe).toBe(true);
    });

    test("should check for safe levels, extra 2", () => {
        const isSafe = isReportSafe([9, 7, 4, 2, 1, 6]);
        expect(isSafe).toBe(true);
    });

    test("should check for safe levels, extra 3", () => {
        const isSafe = isReportSafe([1, 3, 6, 9, 9, 10, 8]);
        expect(isSafe).toBe(false);
    });

    test("should check for safe levels, extra 4", () => {
        const isSafe = isReportSafe([8, 9, 7, 6, 4, 2, 1]);
        expect(isSafe).toBe(true);
    });

    test("should check for safe levels, extra 5", () => {
        const isSafe = isReportSafe([1, 1, 3, 4, 5, 6, 7, 8, 9]);
        expect(isSafe).toBe(true);
    });
});
