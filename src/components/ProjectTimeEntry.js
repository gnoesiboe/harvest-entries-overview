// @flow

import React from 'react';
import type { TimeEntry } from '../model/type';

type Props = {
    timeEntry: TimeEntry
};

export default function ProjectTimeEntry(props: Props) {
    var { timeEntry } = props;

    return (
        <li className="list-group-item">
            <span className="badge">{ timeEntry.hours }</span>
            { timeEntry.task.name }
        </li>
    )
}
