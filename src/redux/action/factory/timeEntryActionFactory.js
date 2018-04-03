// @flow

import Moment from 'moment';
import { getTimeEntries } from '../../../client/harvestApiClient';
import type { GlobalState } from '../../state/type';
import { FETCH_TIME_ENTRIES_FOR_USER_ON_DAY } from '../type';
import { createPromiseAction } from './actionFactory';

export function createFetchTimeEntriesForUserOnDayAction(userId: number, day: Moment): Function {
    return (dispatch: Function, getState: Function) => {
        var state: GlobalState = getState();

        var from = day.clone();
        from.startOf('day');

        var until = day.clone();
        until.endOf('day');

        var promise = getTimeEntries(
            state.settings.harvestAccessToken,
            state.settings.harvestAccountId,
            userId,
            from,
            until
        );

        var action = createPromiseAction(
            FETCH_TIME_ENTRIES_FOR_USER_ON_DAY,
            promise,
            { userId, day },
            { userId, day }
        );

        return dispatch(action);
    }
}
