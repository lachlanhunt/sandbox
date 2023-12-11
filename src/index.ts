import readline from "node:readline";

const rl = readline.createInterface({ input: process.stdin });

let linesPromise: Promise<string[]> | null = null;

export const readLines = async (): Promise<string[]> => {
    const lines: string[] = [];

    if (!linesPromise) {
        linesPromise = new Promise((resolve) => {
            rl.on("line", (line) => {
                lines.push(line);
            });

            rl.on("close", () => {
                resolve(lines);
            });
        });
    }
    return linesPromise;
};
