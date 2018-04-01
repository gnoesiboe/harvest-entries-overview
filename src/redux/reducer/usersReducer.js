// @flow

import { FETCH_ALL_USERS } from '../action/type';
import { FULFILLED } from 'redux-promise-middleware';
import type { User } from '../../model/type';
import type { Action } from '../action/type';
import { createUserFromApiInput } from '../../model/factory/userFactory';

export type UsersReducerState = Array<User>;

export default function usersReducer(currentState: UsersReducerState = [], action: Action): UsersReducerState {
    switch (action.type) {
        case `${FETCH_ALL_USERS}_${FULFILLED}`:
            return action.payload.map((apiInput) => createUserFromApiInput(apiInput));

        default:
            // do nothing. State not interesting for this usersReducer
            return currentState;
    }
}
