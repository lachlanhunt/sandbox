// cat src/day5/sample | yarn node --loader ts-node/esm src/day5/index.ts
// cat src/day5/input | yarn node --loader ts-node/esm src/day5/index.ts

import { readLines } from "../index";
import { getInvalidBooks, getMiddlePages, getValidBooks, processPages, processRules, sortPages } from "./book";

const input = await readLines();

const blankLine = input.findIndex((line) => line === "");

const rules = input.slice(0, blankLine);
const pageNumbers = input.slice(blankLine + 1);

const ruleMap = processRules(rules);
const books = processPages(pageNumbers);
const validBooks = getValidBooks(ruleMap, books);
const invalidBooks = getInvalidBooks(ruleMap, books);

const validMiddlePages = getMiddlePages(ruleMap, validBooks);
invalidBooks.forEach((book) => sortPages(ruleMap, book));
const invalidMiddlePages = getMiddlePages(ruleMap, invalidBooks);

const validSum = validMiddlePages.reduce((acc, page) => acc + page, 0);
const invalidSum = invalidMiddlePages.reduce((acc, page) => acc + page, 0);

console.log("Valid Result:", validSum);
console.log("Invalid Result:", invalidSum);
