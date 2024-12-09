import { describe, expect, test } from "vitest";
import {
    getInvalidBooks,
    getMiddlePage,
    getMiddlePages,
    getValidBooks,
    processPages,
    processRules,
    sortPages,
    validatePageSequence,
} from "./book";

const rules = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`.split("\n");

const pageNumbers = `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.split("\n");

describe("Day 5", () => {
    test("should process the rules", () => {
        const result = processRules(rules);
        expect(result).toEqual(
            new Map([
                [97, new Set([13, 29, 47, 53, 61, 75])],
                [75, new Set([13, 29, 47, 53, 61])],
                [47, new Set([13, 29, 53, 61])],
                [61, new Set([13, 29, 53])],
                [53, new Set([13, 29])],
                [29, new Set([13])],
            ]),
        );
    });

    test("should process the pages", () => {
        const result = processPages(pageNumbers);
        expect(result).toEqual([
            [75, 47, 61, 53, 29],
            [97, 61, 53, 29, 13],
            [75, 29, 13],
            [75, 97, 47, 61, 53],
            [61, 13, 29],
            [97, 13, 75, 29, 47],
        ]);
    });

    test("should validate the page sequence", () => {
        const ruleMap = processRules(rules);
        const books = processPages(pageNumbers);

        expect(validatePageSequence(ruleMap, books[0])).toBe(true);
        expect(validatePageSequence(ruleMap, books[1])).toBe(true);
        expect(validatePageSequence(ruleMap, books[2])).toBe(true);
        expect(validatePageSequence(ruleMap, books[3])).toBe(false);
        expect(validatePageSequence(ruleMap, books[4])).toBe(false);
        expect(validatePageSequence(ruleMap, books[5])).toBe(false);
    });

    test("should get the middle page", () => {
        const pages = [75, 47, 61, 53, 29];
        expect(getMiddlePage(pages)).toBe(61);
    });

    test("should get the valid books", () => {
        const ruleMap = processRules(rules);
        const books = processPages(pageNumbers);

        const validBooks = getValidBooks(ruleMap, books);
        expect(validBooks).toEqual([
            [75, 47, 61, 53, 29],
            [97, 61, 53, 29, 13],
            [75, 29, 13],
        ]);
    });

    test("should get the middle pages from valid books", () => {
        const ruleMap = processRules(rules);
        const books = processPages(pageNumbers);
        const validBooks = getValidBooks(ruleMap, books);
        const result = getMiddlePages(ruleMap, validBooks);
        expect(result).toEqual([61, 53, 29]);
    });

    test("should get the middle pages from invalid books", () => {
        const ruleMap = processRules(rules);
        const books = processPages(pageNumbers);
        const invalidBooks = getInvalidBooks(ruleMap, books);
        const result = getMiddlePages(ruleMap, invalidBooks);
        expect(result).toEqual([47, 13, 75]);
    });

    test("should sort the pages", () => {
        const ruleMap = processRules(rules);
        const pages = [75, 97, 47, 61, 53];
        const result = sortPages(ruleMap, pages);
        expect(result).toEqual([97, 75, 47, 61, 53]);
    });
});
