// @flow

import type { Action } from '../action/type';
import type { GlobalState } from '../state/type';
import * as localStorageRepository from './../../repository/localStorageRepository';

type Next = (action: Action) => void;
type Store = {
    getState: () => GlobalState
};

export default (store: Store) => (next: Next) => (action: Action) : any => {
    var response = next(action),
        newState : GlobalState = store.getState();

    localStorageRepository.save(newState);

    return response;
}
