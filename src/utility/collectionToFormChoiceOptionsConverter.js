// @flow

import type { FormChoiceOptionList } from '../components/form/FormMultipleChoice';
import type { UsersReducerState } from '../redux/reducer/usersReducer';

export function convertUsersCollectionToFormChoiceOptions(users: UsersReducerState): FormChoiceOptionList {
    return users.map(
        (user) => {
            return {
                label: user.name,
                value: user.id
            };
        }
    );
}
