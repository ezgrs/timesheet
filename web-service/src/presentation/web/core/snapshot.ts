export type Snapshot<T> =
    | { type: "waiting" }
    | { type: "error"; value: any }
    | { type: "done"; value: T }
