import { Id } from "../types";

export function* idGenerator(prefix = "", start: Parameters<typeof BigInt>[0] = 0): Generator<Id, never, never> {
    let id = BigInt(start);

    while (true) {
        yield `${prefix}${id}`;
        id = id + 1n;
    }
}
