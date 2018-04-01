// @flow

import type { GlobalState } from '../redux/state/type';
import store from 'store';

export function save(state: ?GlobalState): void {
    store.set('state', state);
}

export function getState(): ?GlobalState {
    return store.get('state');
}
