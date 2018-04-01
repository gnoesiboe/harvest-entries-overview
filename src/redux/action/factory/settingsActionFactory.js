// @flow

import type { UpdateSettingsAction } from '../type';
import { UPDATE_SETTINGS } from '../type';

export function createUpdateSettingsAction(harvestAccessToken: string, harvestAccountId: string): UpdateSettingsAction {
    return {
        type: UPDATE_SETTINGS,
        harvestAccessToken,
        harvestAccountId
    };
}
