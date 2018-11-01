export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const FETCH_TIME_ENTRIES_FOR_USER_ON_DAY = 'FETCH_TIME_ENTRIES_FOR_USER_ON_DAY';
export const FETCH_TIME_ENTRIES_FOR_USER_IN_WEEK = 'FETCH_TIME_ENTRIES_FOR_USER_IN_WEEK';

export type UpdateSettingsAction = $ReadOnly<{
    type: UPDATE_SETTINGS,
    harvestAccessToken: String,
    harvestAccountId: String,
    userIds: Array<number>,
    jiraUrl: string,
    jiraUsername: string,
    jiraPassword: string
}>;

// @todo have it better match reality
export type FetchAllUsersAction = $ReadOnly<{
    type: FETCH_ALL_USERS
}>;

// @todo have it better match reality
export type FetchTimeEntriesForUserOnDayAction = $ReadOnly<{
    type: FETCH_TIME_ENTRIES_FOR_USER_ON_DAY
}>;

// @todo have it better match reality
export type FetchTimeEntriesForUserInWeekAction = $ReadOnly<{
    type: FETCH_TIME_ENTRIES_FOR_USER_IN_WEEK
}>;

export type Action =
    | UpdateSettingsAction
    | FetchAllUsersAction
    | FetchTimeEntriesForUserInWeekAction
    | FetchTimeEntriesForUserOnDayAction;
