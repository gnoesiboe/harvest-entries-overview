export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';

export type Action = $ReadOnly<{
    type: String
}>;

export type UpdateSettingsAction = $ReadOnly<{
    type: UPDATE_SETTINGS,
    harvestAccessToken: String,
    harvestAccountId: String,
    userIds: Array<Number>
}>;

export type FetchAllUsersAction = $ReadOnly<{
    type: FETCH_ALL_USERS
}>;
