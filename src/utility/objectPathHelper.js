// @flow

import { isObject } from 'lodash';

export function extractPath(path: string, theObject: Object, defaultValue: any = null): any {
    var pathParts: Array<string> = path.split('.'),
        firstPathPart: string = pathParts.shift();

    if (!isObject(theObject) || typeof theObject[firstPathPart] === 'undefined') {
        return defaultValue;
    }

    return pathParts.length === 0
        ? theObject[firstPathPart]
        : extractPath(pathParts.join('.'), theObject[firstPathPart], defaultValue);
}
