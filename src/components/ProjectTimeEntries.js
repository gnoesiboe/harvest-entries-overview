// @flow

import React from 'react';
import type { TimeEntry } from '../model/type';
import ProjectTimeEntry from './ProjectTimeEntry';

type Props = {
    projectName: string,
    timeEntries: Array<TimeEntry>
};

export default function ProjectTimeEntries(props: Props) {
    var { timeEntries, projectName } = props;

    return (
        <div className="panel panel-info">
            <div className="panel-heading">{ projectName }</div>

            <ul className="list-group">
                { timeEntries.map((timeEntry: TimeEntry) => (
                    <ProjectTimeEntry
                        timeEntry={ timeEntry }
                        key={ timeEntry.id }
                    />
                )) }
            </ul>
        </div>
    );
}
