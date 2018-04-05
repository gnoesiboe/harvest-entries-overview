// @flow

import Moment from 'moment';

export function getCurrentWeekNumber(): number {
    return parseInt(Moment().isoWeek(), 10);
}

export function getStartOfWeek(weekNumber: number): Moment {
    var moment: Moment = Moment().isoWeek(weekNumber);
    
    return moment.startOf('isoWeek');
}

export function getEndOfWeek(weekNumber: number): Moment {
    var moment: Moment = Moment().isoWeek(weekNumber);

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
