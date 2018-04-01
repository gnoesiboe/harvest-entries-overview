// @flow

export function createHomePath() {
    return '/';
}

export function createWeekDetailPath(week: ?Number): string {
    return '/week/' + (week ? week.toString() : ':number');
}

export function createSupplyAccessTokenPath(): string {
    return '/supply-access-token';
}
