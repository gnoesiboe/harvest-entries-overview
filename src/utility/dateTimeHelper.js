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

export function getAllDatesWithinPeriod(start: Moment, end: Moment): Array<Moment> {
    var moments = [];

    var currentMoment = start.clone();

    while (currentMoment.isBefore(end)) {
        moments.push(currentMoment);

        currentMoment = currentMoment.clone();
        currentMoment.add(1, 'days');
    }

    return moments;
}
