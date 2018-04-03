// @flow

export function createPromiseAction(
    type: String,
    promise: Promise<any>,
    data: Object = {},
    meta: Object = {}
): Object {
    return {
        type,
        payload: { promise, data },
        meta
    };
}
