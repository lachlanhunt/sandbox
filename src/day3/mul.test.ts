import { describe, expect, test } from "vitest";
import { evaluateMulExpression, evaluateMulExpressions, findMulExpressions, splitDoAndDontInstructions } from "./mul";

const sample = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))mul(-123,-0)";
const sample2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

describe("Multiplication", () => {
    test("find valid mul expressions", () => {
        const expressions = findMulExpressions(sample);
        expect(expressions).toEqual(["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"]);
    });

    test("evaluate mul expressions", () => {
        const expressions = findMulExpressions(sample);
        const results = expressions.map((e) => evaluateMulExpression(e));
        expect(results).toEqual([8, 25, 88, 40]);
    });

    test("evaluate mul expressions from empty input", () => {
        const expressions = findMulExpressions("");
        const results = expressions.map((e) => evaluateMulExpression(e));
        expect(results).toEqual([]);
    });

    test("evaluate mul expressions from invalid input", () => {
        const expressions = findMulExpressions("mul(2,4");
        const results = expressions.map((e) => evaluateMulExpression(e));
        expect(results).toEqual([]);
    });

    test("evaluate mul expressions from sample input", () => {
        const expressions = findMulExpressions(sample);
        const results = evaluateMulExpressions(expressions);
        expect(results).toEqual([8, 25, 88, 40]);
    });

    test("remove dont instructions from sample 2", () => {
        const result = splitDoAndDontInstructions(sample2);
        expect(result).toEqual("xmul(2,4)&mul[3,7]!^?mul(8,5))");
    });

    test("remove dont instructions from sample 2", () => {
        const line = splitDoAndDontInstructions(sample2);
        const expressions = findMulExpressions(line);
        const results = evaluateMulExpressions(expressions);
        expect(results).toEqual([8, 40]);
    });
});
