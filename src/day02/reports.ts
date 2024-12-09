export function* getPairs<T>(arr: T[]): Generator<[T, T]> {
    for (let i = 0; i < arr.length - 1; i++) {
        yield [arr[i], arr[i + 1]];
    }
}

export function getLevels(line: string) {
    return line.split(" ").map(Number);
}

export function* getLevelsFromLines(lines: string[]) {
    for (let line of lines) {
        yield getLevels(line);
    }
}

export const isReportSafe = (levels: number[], recursive = true) => {
    const pairs = getPairs(levels);

    let [a, b] = levels;
    let diff = b - a;
    const sign = Math.sign(diff); //?

    // Check all levels are ascending or descending
    for (let [a, b] of pairs) {
        diff = b - a;
        // console.log(a, b, diff);
        if (sign === 0 || sign !== Math.sign(diff) || Math.abs(diff) > 3) {
            if (recursive) {
                for (let i = 0; i < levels.length; i++) {
                    const copy = levels.toSpliced(i, 1);
                    if (isReportSafe(copy, false)) return true;
                }
            }
            return false;
        }
    }
    return true;
};
