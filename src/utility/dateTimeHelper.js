// @flow

import Moment from 'moment';

export function getCurrentWeekNumber(): Number {
    return Moment().isoWeek();
}

export function getStartOfWeek(weekNumber: number): Moment {
    return Moment().isoWeek(weekNumber);
}

export function getEndOfWeek(weekNumber: number): Moment {
    var moment = Moment().isoWeek(weekNumber);

    return moment.endOf('isoWeek')
}
