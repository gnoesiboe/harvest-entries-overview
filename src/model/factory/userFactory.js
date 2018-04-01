// @flow

import type { User } from '../type';

type ApiInput = {
    id: number,
    first_name: string,
    last_name: string
};

export function createUserFromApiInput(apiInput: ApiInput): User {
    return {
        id: apiInput.id,
        name: `${apiInput.first_name} ${apiInput.last_name}`
    };
}
