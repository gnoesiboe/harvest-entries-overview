// @flow

import React from 'react';
import type { User } from '../../../model/type';
import type { TimeEntry } from '../../../model/type';

export type OnRefreshCallback = () => void;

type Props = {
    user: User,
    onRefresh: OnRefreshCallback,
    timeEntries: Array<TimeEntry>
};

export default class DayForUser extends React.Component<Props> {

    _onRefreshClick = (): void => {
        this.props.onRefresh();
    };

    _renderTimeEntry(timeEntry: TimeEntry) {
        return (
            <li key={ timeEntry.id }>
                { timeEntry.project.name } / { timeEntry.task.name } => { timeEntry.hours }
            </li>
        )
    }

    render() {
        var { timeEntries } = this.props;

        return (
            <div>
                <button className="btn btn-link" onClick={ this._onRefreshClick }>
                    <i className="glyphicon glyphicon-refresh" />
                </button>
                <ul>
                    { timeEntries.map((timeEntry: TimeEntry) => this._renderTimeEntry(timeEntry)) }
                </ul>
            </div>
        );
    }
}
