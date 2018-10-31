// @flow

import type { Action, UpdateSettingsAction } from '../action/type';
import { UPDATE_SETTINGS } from '../action/type';

export type SettingsReducerState = {
    harvestAccessToken: string | null,
    harvestAccountId: string | null,
    userIds: Array<number>,
    jiraUrl: string | null,
    jiraUsername: string | null,
    jiraPassword: string | null
};

const DEFAULT_STATE: SettingsReducerState = {
    harvestAccessToken: null,
    harvestAccountId: null,
    userIds: [],
    jiraUrl: null,
    jiraUsername: null,
    jiraPassword: null
};

export default function settingsReducer(currentState: SettingsReducerState = DEFAULT_STATE, action: Action): SettingsReducerState {
    switch (action.type) {
        case UPDATE_SETTINGS:
            var updateSettingsAction : UpdateSettingsAction = (action: Action);
            return {
                ...currentState,
                ...updateSettingsAction
            };

        default:
            // action not useful for this reducer, let it go..
            return currentState;
    }
}
