// cat src/day2/input | yarn node --loader ts-node/esm src/day2/index.ts

import { readLines } from "../index";

type GameSet = {
    red?: number;
    green?: number;
    blue?: number;
};

type ValidateSetFn = {
    (set: GameSet): boolean;
};

type Color = keyof GameSet;

const RED_BALLS = 12;
const GREEN_BALLS = 13;
const BLUE_BALLS = 14;

const validateSet: ValidateSetFn = ({ red = 0, green = 0, blue = 0 }) => {
    return red <= RED_BALLS && green <= GREEN_BALLS && blue <= BLUE_BALLS;
};

const lines = await readLines();

const games = lines.map((line) => {
    // ^?
    const [gameId, resultData] = line.split(":");

    const gameNumber = Number.parseInt(gameId.split(" ")[1]);

    const sets = resultData.split(";").map((set) => {
        const entries = set.split(",").map((value) => {
            const [number, color] = value.trim().split(" ") as [string, Color];
            return [color, Number.parseInt(number)] as const;
        });

        const result: { [k in Color]?: number } = Object.fromEntries(entries);
        //    ^?
        return result;
    });

    return [gameNumber, sets] as const;
});

const validGames = games.filter(([, sets]) => sets.every((set) => validateSet(set)));

// console.log(validGames);

const validGameNumbers = validGames.map(([gameNumber]) => gameNumber);

const sum = validGameNumbers.reduce((acc, curr) => acc + curr, 0);

console.log("Sum:", sum);

// Part 2
const minimumGameBalls = games.map(([gameNumber, sets]) => {
    return [
        gameNumber,
        sets.reduce<Required<GameSet>>(
            (acc, curr) => {
                const red = Math.max(acc.red, curr.red ?? 0);
                const green = Math.max(acc.green, curr.green ?? 0);
                const blue = Math.max(acc.blue, curr.blue ?? 0);

                return { red, green, blue };
            },
            { red: 0, green: 0, blue: 0 }
        ),
    ] as const;
});

// console.log(minimumGameBalls);

const powerOfSets = minimumGameBalls.map(([, set]) => {
    const { red, green, blue } = set;
    return red * green * blue;
});

const totalPower = powerOfSets.reduce((acc, curr) => acc + curr, 0);

console.log("Total power:", totalPower);
