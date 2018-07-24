// @flow

import { extractPath } from "./objectPathHelper";

export function extractWeekNumberFromRouteParams(props: Object, name: string): ?number {
    var weekNumber: number = parseInt(extractPath('match.params.number', props, null), 10);

    if (isNaN(weekNumber)) {
        return null;
    }

    // @todo validate weekNumber exists
    
    return weekNumber;
}