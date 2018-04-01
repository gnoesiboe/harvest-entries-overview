// @flow

import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { createReducersChain } from '../reducer/reducerFactory';
import localPersistingMiddleware from '../middleware/localPersistingMiddleware';
import { getState } from '../../repository/localStorageRepository';
import type { GlobalState } from '../state/type';

export function createStore(id: string): Object {
    var middleware : Array<Function> = [
        localPersistingMiddleware,
        promiseMiddleware(),
        thunkMiddleware
    ];

    type StoreFactoryType = (reducers: Function, initialState: GlobalState) => Object;

    var createStoreWithMiddleware : StoreFactoryType = applyMiddleware(...middleware)(reduxCreateStore);

    return createStoreWithMiddleware(
        createReducersChain(),
        getState(),
        // $ExpectError
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
