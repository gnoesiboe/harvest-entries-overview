// @flow

import Moment from 'moment';
import React from 'react';
import type { User } from '../../../model/type';
import type { TimeEntry } from '../../../model/type';
import type { GlobalState } from '../../../redux/state/type';
import LoadingIndicator from 'react-loading-indicator';
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

type State = {
    timeEntries: ?Array<TimeEntry>
}

class DayForUser extends React.Component<Props, State> {

    state: State = {
        timeEntries: resolveTimeEntriesForUserOnDay(
            this.props.user.id,
            this.props.day,
            this.props.timeEntries
        )
    };

    componentDidMount() {
        this._fetchTimeEntries();
    }

    // noinspection JSUnusedGlobalSymbols
    static getDerivedStateFromProps(nextProps: Props, prevState: State): ?State {
        var currentTimeEntries = prevState.timeEntries;

        var newTimeEntries = resolveTimeEntriesForUserOnDay(
            nextProps.user.id,
            nextProps.day,
            nextProps.timeEntries
        );

        if (JSON.stringify(currentTimeEntries) !== JSON.stringify(newTimeEntries)) {
            return {
                timeEntries: newTimeEntries
            };
        }

        return null;
    }

    _fetchTimeEntries = (): void => {
        var { user, dispatch, day } = this.props;

        dispatch(
            createFetchTimeEntriesForUserOnDayAction(user.id, day)
        )
    };

    _onRefreshClick = (): void => {
        var { timeEntries } = this.state;

        if (Array.isArray(timeEntries)) {
            this.setState(
                (currentState: State): State => {
                    return {
                        ...currentState,
                        timeEntries: null
                    };
                },
                this._fetchTimeEntries
            );
        } else {
            this._fetchTimeEntries();
        }
    };

    _renderTimeEntry(timeEntry: TimeEntry) {
        return (
            <li className="list-group-item" key={ timeEntry.id }>
                <span className="badge">{ timeEntry.hours }</span>
                { timeEntry.project.name } / { timeEntry.task.name }
            </li>
        )
    }

    render() {
        var { timeEntries } = this.state;

        if (!Array.isArray(timeEntries)) {
            return (
                <div>
                    <button className="btn btn-link" disabled={ true }>
                        <LoadingIndicator/>
                    </button>
                </div>
            );
        }

        return (
            <div>
                <button className="btn btn-link" onClick={ this._onRefreshClick }>
                    <i className="glyphicon glyphicon-refresh" />
                </button>
                <ul className="list-group">
                    { timeEntries.map((timeEntry: TimeEntry) => this._renderTimeEntry(timeEntry)) }
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
