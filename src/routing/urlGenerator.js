// @flow

export function createHomePath() {
    return '/';
}

export function createWeekDetailPath(week: ?number): string {
    return '/week/' + (week ? week.toString() : ':number');
}

export function createSettingsPath(): string {
    return '/settings';
}
