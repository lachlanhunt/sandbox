/**
 * Any primitive, object or array value that can be represented in JSON
 */
export type JSONValue = string | number | boolean | null | { [member: string]: JSONValue } | JSONValue[];
