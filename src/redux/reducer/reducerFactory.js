// @flow

import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';
import usersReducer from './usersReducer';

export function createReducersChain() {
    var reducers : Object = {
        settings: settingsReducer,
        users: usersReducer
    };

    return combineReducers(reducers);
}
