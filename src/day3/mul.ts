export const findMulExpressions = (input: string): string[] => {
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = input.match(mulRegex);
    return matches || [];
};

export const evaluateMulExpression = (expression: string): number => {
    const [_, a, b] = expression.match(/mul\((\d{1,3}),(\d{1,3})\)/) || [];
    return Number.parseInt(a) * Number.parseInt(b);
};

export const evaluateMulExpressions = (expressions: string[]): number[] => {
    return expressions.map(evaluateMulExpression);
};

export const splitDoAndDontInstructions = (input: string): string => {
    const doLines = input.split("do()");
    return doLines.map((line) => line.split("don't()")[0]).join("");
};
