// @flow

import { FETCH_ALL_USERS } from '../type';
import { getAllUsers } from '../../../client/harvestApiClient';

function _createPromiseAction(type: String, promise: Promise<any>, data: Object = {}, meta: Object = {}): Object {
    return {
        type,
        payload: { promise, data },
        meta
    };
}

export function createFetchAllUsersAction(harvestAccessToken: string): Function {
    return (dispatch) => {
        var promise = getAllUsers(harvestAccessToken),
            action = _createPromiseAction(FETCH_ALL_USERS, promise);

        return dispatch(action);
    };
}
