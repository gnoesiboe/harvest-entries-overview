// @flow

import Moment from 'moment';
import React from 'react';
import type { User } from '../../../model/type';
import type { TimeEntry } from '../../../model/type';
import type { GlobalState } from '../../../redux/state/type';
import { connect } from 'react-redux';
import { resolveTimeEntriesForUserOnDay } from '../../../resolver/timeEntriesResolver';
import type { TimeEntriesReducerState } from '../../../redux/reducer/timeEntriesReducer';
import { createFetchTimeEntriesForUserOnDayAction } from '../../../redux/action/factory/timeEntryActionFactory';
import groupArray from 'group-array';
import ProjectTimeEntries from '../../../components/ProjectTimeEntries';
import RefreshButton from '../../../components/RefreshButton';
import LoadingButton from '../../../components/LoadingButton';

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

    render() {
        var { timeEntries } = this.state;

        if (!Array.isArray(timeEntries)) {
            return (
                <div>
                    <LoadingButton />
                </div>
            );
        }

        var timeEntriesGroupedByProject: { [string]: Array<TimeEntry> } = groupArray(timeEntries, 'project.name');

        return (
            <div>
                <RefreshButton onClick={ this._onRefreshClick } />

                { Object.keys(timeEntriesGroupedByProject).map((projectName: string, index: number) => {
                    var timeEntriesInProject: Array<TimeEntry> = timeEntriesGroupedByProject[projectName];

                    return (
                        <ProjectTimeEntries
                            key={ index }
                            projectName={ projectName }
                            timeEntries={ timeEntriesInProject }
                        />
                    );
                }) }
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
