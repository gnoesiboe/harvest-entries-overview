// @flow

import type { TimeEntry } from '../../model/type';
import type { Action } from '../action/type';
import { FETCH_TIME_ENTRIES_FOR_USER_ON_DAY } from '../action/type';
import { FULFILLED } from 'redux-promise-middleware';
import type { FetchTimeEntriesForUserOnDayAction } from '../action/type';
import { createTimeEntryFromApiInput } from '../../model/factory/timeEntryFactory';

export type TimeEntriesReducerState = {
    [number]: TimeEntry
};

function _handleFetchTimeEntriesForUserOnDayAction(currentState: TimeEntriesReducerState, action: FetchTimeEntriesForUserOnDayAction): TimeEntriesReducerState {
    var timeEntries: Array<TimeEntry> = action.payload.map((timeEntryApiInput) => createTimeEntryFromApiInput(timeEntryApiInput));

    var newState = {
        ...currentState
    };

    for (let i = 0, l = timeEntries.length; i < l; i++) {
        var timeEntry: TimeEntry = timeEntries[i];

        newState[timeEntry.id] = timeEntry;
    }

    return newState;
}

export default function timeEntriesReducer(currentState: TimeEntriesReducerState = {}, action: Action): TimeEntriesReducerState {
    switch (action.type) {
        case `${FETCH_TIME_ENTRIES_FOR_USER_ON_DAY}_${FULFILLED}`:
            var fetchTimeEntriesForUserOnDayAction: FetchTimeEntriesForUserOnDayAction = (action: Action);
            return _handleFetchTimeEntriesForUserOnDayAction(currentState, fetchTimeEntriesForUserOnDayAction);

        default:
            return currentState;        
    }
}