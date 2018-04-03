import type { SettingsReducerState } from '../reducer/settingsReducer';
import type { UsersReducerState } from '../reducer/usersReducer';
import type { TimeEntriesReducerState } from '../reducer/timeEntriesReducer';

export type GlobalState = {
    settings: SettingsReducerState,
    users: UsersReducerState,
    timeEntries: TimeEntriesReducerState
};
