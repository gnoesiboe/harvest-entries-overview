// @flow

export type User = $ReadOnly<{|
    id: number,
    name: string
|}>;

export type TimeEntry = $ReadOnly<{|
    id: number,
    spentAt: string,
    hours: number,
    userId: number,
    project: {
        id: number,
        name: string
    },
    task: {
        id: number,
        name: string
    },
    billable: boolean,
    notes: ?string
|}>;
