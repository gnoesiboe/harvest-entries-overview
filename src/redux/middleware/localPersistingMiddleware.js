// @flow

import type { Action } from '../action/type';
import type { GlobalState } from '../state/type';
import * as localStorageRepository from './../../repository/localStorageRepository';

type Next = (action: Action) => void;
type Store = {
    getState: () => GlobalState
};

export default (store: Store) => (next: Next) => (action: Action) : any => {
    var response: any = next(action),
        globalState: GlobalState = store.getState();

    // don't save users and time entries in local storage
    var stateToSave = {
        settings: globalState.settings
    };

    localStorageRepository.save(stateToSave);

    return response;
}
