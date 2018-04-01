export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export type Action = $ReadOnly<{
    type: String
}>;

export type UpdateSettingsAction = $ReadOnly<{
    type: String,
    harvestAccessToken: String
}>;
