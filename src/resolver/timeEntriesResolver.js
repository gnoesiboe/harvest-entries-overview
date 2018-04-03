// @flow

import Moment from 'moment';
import type { TimeEntry } from '../model/type';
import type { TimeEntriesReducerState } from '../redux/reducer/timeEntriesReducer';

export function resolveTimeEntriesForUserOnDay(userId: number, day: Moment, timeEntries: TimeEntriesReducerState): Array<TimeEntry> {
    var timeEntriesAsArray: Array<TimeEntry> = Object.keys(timeEntries).map(
        (key: string) => {
            return timeEntries[parseInt(key, 10)];
        }
    );

    if (timeEntriesAsArray.length === 0) {
        return [];
    }

    return timeEntriesAsArray.filter((timeEntry: TimeEntry) => {
        var timeEntryDayAsMoment: Moment = Moment(timeEntry.spentAt, 'YYYY-MM-DD');

        return timeEntry.userId === userId && timeEntryDayAsMoment.isSame(day, 'day');
    });
}
