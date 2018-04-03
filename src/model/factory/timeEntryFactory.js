// @flow

import type { TimeEntry } from '../type';

type ApiInput = {
    id: number,
    spent_date: string,
    hours: number,
    user: {
        id: number,
        name: string
    },
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
};

export function createTimeEntryFromApiInput(apiInput: ApiInput): TimeEntry {
    return {
        id: apiInput.id,
        spentAt: apiInput.spent_date,
        hours: apiInput.hours,
        userId: apiInput.user.id,
        project: apiInput.project,
        task: apiInput.task,
        billable: apiInput.billable,
        notes: apiInput.notes
    };
}

