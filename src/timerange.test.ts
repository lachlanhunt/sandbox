import { type Range, collateTimeRanges } from "./timerange";

describe("timerange", () => {
    it("should combine overlapping times", () => {
        const ranges: Range[] = [
            { start: 1, end: 2 },
            { start: 2, end: 3 },
            { start: 3, end: 4 },
            { start: 4, end: 5 },
        ];
        const collated = collateTimeRanges(ranges);
        expect(collated).toEqual([{ start: 1, end: 5 }]);
    });

    it("should not combine non-overlapping times", () => {
        const ranges: Range[] = [
            { start: 1, end: 2 },
            { start: 3, end: 4 },
            { start: 5, end: 6 },
            { start: 7, end: 8 },
        ];
        const collated = collateTimeRanges(ranges);
        expect(collated).toEqual(ranges);
    });

    it("should handle ranges with some overlapping and some non-overlapping times", () => {
        const ranges: Range[] = [
            { start: 1, end: 4 },
            { start: 2, end: 3 },
            { start: 5, end: 7 },
            { start: 6, end: 8 },
        ];
        const collated = collateTimeRanges(ranges);
        expect(collated).toEqual([
            { start: 1, end: 4 },
            { start: 5, end: 8 },
        ]);
    });

    it("should handle realistic unix timestamps", () => {
        const ranges: Range[] = [
            { start: 1699143821157, end: 1699158653419 },
            { start: 1699310036473, end: 1699313562104 },
            { start: 1699210281649, end: 1699226701685 },
            { start: 1699003300090, end: 1699008800891 },
            { start: 1698998254127, end: 1699003305569 },
            { start: 1699141532152, end: 1699155889243 },
            { start: 1699245213894, end: 1699264255533 },
            { start: 1698928300891, end: 1698940126110 },
            { start: 1699016047661, end: 1699042335863 },
            { start: 1699242487987, end: 1699264482978 },
        ];

        const collated = collateTimeRanges(ranges);
        expect(collated).toEqual([
            { start: 1698928300891, end: 1698940126110 },
            { start: 1698998254127, end: 1699008800891 },
            { start: 1699016047661, end: 1699042335863 },
            { start: 1699141532152, end: 1699158653419 },
            { start: 1699210281649, end: 1699226701685 },
            { start: 1699242487987, end: 1699264482978 },
            { start: 1699310036473, end: 1699313562104 },
        ]);
    });
});
