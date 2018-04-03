// @flow

import Moment from 'moment';
import React from 'react';
import type { User } from '../../../model/type';
import type { TimeEntry } from '../../../model/type';
import type { GlobalState } from '../../../redux/state/type';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import { resolveTimeEntriesForUserOnDay } from '../../../resolver/timeEntriesResolver';
import type { TimeEntriesReducerState } from '../../../redux/reducer/timeEntriesReducer';
import { createFetchTimeEntriesForUserOnDayAction } from '../../../redux/action/factory/timeEntryActionFactory';

type Props = {
    user: User,
    day: Moment,
    dispatch: Function,
    timeEntries: TimeEntriesReducerState
};

type ReduxProps = {
    timeEntries: TimeEntriesReducerState
}

class DayForUser extends React.Component<Props> {

    _onRefreshClick = (): void => {
        var { user, dispatch, day } = this.props;

        dispatch(
            createFetchTimeEntriesForUserOnDayAction(user.id, day)
        );
    };

    _renderTimeEntry(timeEntry: TimeEntry) {
        return (
            <li key={ timeEntry.id }>
                { timeEntry.project.name } / { timeEntry.task.name } => { timeEntry.hours }
            </li>
        )
    }

    render() {
        var { timeEntries, user, day } = this.props;

        var timeEntriesForUserOnDay = resolveTimeEntriesForUserOnDay(user.id, day, timeEntries);

        return (
            <div>
                <button className="btn btn-link" onClick={ this._onRefreshClick }>
                    <i className="glyphicon glyphicon-refresh" />
                </button>
                <ul>
                    { timeEntriesForUserOnDay.map((timeEntry: TimeEntry) => this._renderTimeEntry(timeEntry)) }
                </ul>
            </div>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalState): ReduxProps {
    return {
        timeEntries: globalState.timeEntries
    }
}

export default connect(_mapGlobalStateToProps)(DayForUser);
