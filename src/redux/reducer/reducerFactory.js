// @flow

import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';

export function createReducersChain() {
    var reducers : Object = {
        settings: settingsReducer,
        currentWeek: null
    };

    return combineReducers(reducers);
}
