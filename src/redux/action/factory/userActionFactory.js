// @flow

import { FETCH_ALL_USERS } from '../type';
import { getAllUsers } from '../../../client/harvestApiClient';
import type { GlobalState } from '../../state/type';
import { createPromiseAction } from './actionFactory';


export function createFetchAllUsersAction(): Function {
    return (dispatch: Function, getState: Function) => {
        var state: GlobalState = getState();

        var promise = getAllUsers(
                state.settings.harvestAccessToken,
                state.settings.harvestAccountId
            );

        var action = createPromiseAction(FETCH_ALL_USERS, promise);

        return dispatch(action);
    };
}
