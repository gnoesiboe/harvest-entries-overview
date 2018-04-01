// @flow

import { FETCH_ALL_USERS } from '../type';
import { getAllUsers } from '../../../client/harvestApiClient';
import type { GlobalState } from '../../state/type';

function _createPromiseAction(type: String, promise: Promise<any>, data: Object = {}, meta: Object = {}): Object {
    return {
        type,
        payload: { promise, data },
        meta
    };
}

export function createFetchAllUsersAction(): Function {
    return (dispatch, getState) => {
        var state: GlobalState = getState();

        var promise = getAllUsers(
                state.settings.harvestAccessToken,
                state.settings.harvestAccountId
            ),
            action = _createPromiseAction(FETCH_ALL_USERS, promise);

        return dispatch(action);
    };
}
