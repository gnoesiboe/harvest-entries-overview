// @flow

import type { UsersReducerState } from '../redux/reducer/usersReducer';
import type { User } from '../model/type';

export function resolveUser(id: Number, allUsers: UsersReducerState): User {
    var user = allUsers.find(user => user.id === id);

    if (!user) {
        throw new Error(`Expecting User with id ${id.toString()} to exist`);
    }

    return user;
}
