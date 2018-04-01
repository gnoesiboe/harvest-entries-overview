// @flow

import FormState from '../lib/forms/model/FormState';
import type { OnChangeCallbackType, OnFormValidCallback } from '../lib/forms/model/FormState';

export function createSettingsFormState(
    onChangeCallback: OnChangeCallbackType,
    onFormValidCallback: OnFormValidCallback,
    harvestAccessToken: ?string,
    harvestAccountId: ?string
): FormState {
    var constraintSet = {
        harvestAccessToken: {
            presence: {
                allowEmpty: false
            }
        },
        harvestAccountId: {
            presence: {
                allowEmpty: false
            }
        }
    };

    var state = new FormState(onChangeCallback, onFormValidCallback, constraintSet);

    state.addElement('harvestAccessToken', harvestAccessToken || '');
    state.addElement('harvestAccountId', harvestAccountId || '');

    return state;
}
