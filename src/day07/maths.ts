export type Calibration = {
    result: number;
    operands: number[];
};

export type Operator = (typeof operators)[number];
const operators = ["+", "*", "||"] as const;

export const processLine = (line: string): Calibration => {
    const [result, operands] = line.split(": ");

    return {
        result: Number(result),
        operands: operands.split(" ").map(Number),
    };
};

export const getOperators = (count: number, index: number) => {
    const radix = operators.length; //?
    const baseN = index.toString(radix).padStart(count, "0");

    return baseN.split("").map((i) => operators[Number(i)]);
};

export const add = (a: number, b: number) => a + b;
export const multiply = (a: number, b: number) => a * b;
export const concat = (a: number, b: number) => Number(`${a}${b}`);

const operate: Record<Operator, (a: number, b: number) => number> = {
    "+": add,
    "*": multiply,
    "||": concat,
};

export const evaluate = ({ operands }: Calibration, operators: Operator[]) => {
    let a: number = operands[0];
    let result = 0;

    for (let i = 0; i < operands.length - 1; i++) {
        const operator = operators[i];
        const b = operands[i + 1];

        result = operate[operator](a, b);

        a = result;
    }
    return result;
};

export const testCalibration = (calibration: Calibration) => {
    const total = operators.length ** (calibration.operands.length - 1); //?

    for (let i = 0; i < total; i++) {
        const operators = getOperators(calibration.operands.length - 1, i); //?
        const result = evaluate(calibration, operators);
        if (result === calibration.result) {
            return true;
        }
    }
    return false;
};

export const sumValidCalibrations = (calibrations: Calibration[]) => {
    const valid = calibrations.filter(testCalibration);
    const sum = valid.reduce((sum, calibration) => sum + calibration.result, 0);
    return sum;
};
