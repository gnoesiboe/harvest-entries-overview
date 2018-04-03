// @flow

import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';
import usersReducer from './usersReducer';
import timeEntriesReducer from './timeEntriesReducer';

export function createReducersChain() {
    var reducers : Object = {
        settings: settingsReducer,
        users: usersReducer,
        timeEntries: timeEntriesReducer
    };

    return combineReducers(reducers);
}
