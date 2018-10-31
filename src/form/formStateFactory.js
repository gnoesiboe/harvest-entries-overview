// @flow

import FormState from '../lib/forms/model/FormState';
import type { OnChangeCallbackType, OnFormValidCallback } from '../lib/forms/model/FormState';

export function createSettingsFormState(
    onChangeCallback: OnChangeCallbackType,
    onFormValidCallback: OnFormValidCallback,
    harvestAccessToken: ?string,
    harvestAccountId: ?string,
    userIds: Array<number>,
    jiraUrl: ?string,
    jiraUsername: ?string,
    jiraPassword: ?string
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
        },
        userIds: {},
        jiraUrl: {
            presence: {
                allowEmpty: false
            }
        },
        jiraUsername: {
            presence: {
                allowEmpty: false
            }
        },
        jiraPassword: {
            presence: {
                allowEmpty: false
            }
        }
    };

    var state = new FormState(onChangeCallback, onFormValidCallback, constraintSet);

    state.addElement('harvestAccessToken', harvestAccessToken || '');
    state.addElement('harvestAccountId', harvestAccountId || '');
    state.addElement('userIds', userIds);
    state.addElement('jiraUrl', jiraUrl || '');
    state.addElement('jiraUsername', jiraUsername || '');
    state.addElement('jiraPassword', jiraPassword || '');

    return state;
}
