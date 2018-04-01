// @flow

import type { Action, UpdateSettingsAction } from '../action/type';
import { UPDATE_SETTINGS } from '../action/type';

export type SettingsReducerState = {
    harvestAccessToken: string | null,
    harvestAccountId: string | null
};

const DEFAULT_STATE: SettingsReducerState = {
    harvestAccessToken: null,
    harvestAccountId: null
};

export default function settingsReducer(currentState: SettingsReducerState = DEFAULT_STATE, action: Action): SettingsReducerState {
    switch (action.type) {
        case UPDATE_SETTINGS:
            // $ExpectError
            var updateSettingsAction : UpdateSettingsAction = (action: Action);
            return {
                ...currentState,
                harvestAccessToken: updateSettingsAction.harvestAccessToken,
                harvestAccountId: updateSettingsAction.harvestAccountId
            };

        default:
            // action not useful for this reducer, let it go..
            return currentState;
    }
}
