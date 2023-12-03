export function isWritable<T extends object>(obj: T, key: string | number | symbol): boolean {
    const descriptor = Reflect.getOwnPropertyDescriptor(obj, key);
    const proto = Reflect.getPrototypeOf(obj);

    if (!descriptor && proto) {
        return isWritable<typeof proto>(proto, key);
    }

    return Boolean(descriptor?.writable || descriptor?.set !== undefined);
}
