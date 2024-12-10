import { evaluate, getOperators, processLine, sumValidCalibrations, testCalibration } from "./maths";

const sample = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`.split("\n");

describe("day07", () => {
    it("should work with sample input", () => {
        expect(processLine(sample[0])).toEqual({
            result: 190,
            operands: [10, 19],
        });

        expect(processLine(sample[1])).toEqual({
            result: 3267,
            operands: [81, 40, 27],
        });
    });

    it("should get operators", () => {
        expect(getOperators(2, 0)).toEqual(["+", "+"]);
        expect(getOperators(2, 1)).toEqual(["+", "*"]);
        expect(getOperators(2, 2)).toEqual(["+", "||"]);
        expect(getOperators(2, 3)).toEqual(["*", "+"]);
        expect(getOperators(3, 6)).toEqual(["+", "||", "+"]);
    });

    it("should evaluate", () => {
        const calibration = processLine(sample[8]); //?

        const operators1 = getOperators(calibration.operands.length - 1, 0);
        const operators2 = getOperators(calibration.operands.length - 1, 7);

        expect(evaluate(calibration, operators1)).toEqual(53);
        expect(evaluate(calibration, operators2)).toEqual(34320);
    });

    it("should test calibration", () => {
        const calibrations = sample.map(processLine);

        expect(testCalibration(calibrations[0])).toEqual(true);
        expect(testCalibration(calibrations[1])).toEqual(true);
        expect(testCalibration(calibrations[2])).toEqual(false);
        expect(testCalibration(calibrations[3])).toEqual(true);
        expect(testCalibration(calibrations[4])).toEqual(true);
        expect(testCalibration(calibrations[5])).toEqual(false);
        expect(testCalibration(calibrations[6])).toEqual(true);
        expect(testCalibration(calibrations[7])).toEqual(false);
        expect(testCalibration(calibrations[8])).toEqual(true);
    });

    it("should sum the valid calibrations", () => {
        const calibrations = sample.map(processLine);

        // expect(sumValidCalibrations(calibrations)).toEqual(3749);
        expect(sumValidCalibrations(calibrations)).toEqual(11387);
    });
});
