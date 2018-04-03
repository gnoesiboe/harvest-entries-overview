// @flow

import React from 'react';
import { extractPath } from '../utility/objectPathHelper';
import { Redirect } from 'react-router-dom';
import { createHomePath } from '../routing/urlGenerator';
import requiresHarvestAccessToken from '../hoc/requiresHarvestAccessToken';
import { connect } from 'react-redux';
import type { GlobalState } from '../redux/state/type';
import type { SettingsReducerState } from '../redux/reducer/settingsReducer';
import type { UsersReducerState } from '../redux/reducer/usersReducer';
import { createFetchAllUsersAction } from '../redux/action/factory/userActionFactory';
import { createFetchTimeEntriesForUserOnDayAction } from '../redux/action/factory/timeEntryActionFactory';
import { getStartOfWeek, getEndOfWeek, getAllDatesWithinPeriod } from '../utility/dateTimeHelper';
import Moment from 'moment';
import DayForUser from '../lib/forms/component/DayForUser';
import { resolveUser } from '../resolver/userResolver';
import { resolveTimeEntriesForUserOnDay } from '../resolver/timeEntriesResolver';
import type { TimeEntriesReducerState } from '../redux/reducer/timeEntriesReducer';

type Props = {
    settings: SettingsReducerState,
    users: UsersReducerState,
    timeEntries: TimeEntriesReducerState,
    dispatch: Dispatch,
    match: {
        params: {
            number: number
        }
    }
};

type ReduxProps = {
    settings: SettingsReducerState,
    users: UsersReducerState,
    timeEntries: TimeEntriesReducerState
};

type State = {
    weekNumber: ?number
};

class WeekDetail extends React.Component<Props, State> {

    state: State = {
        weekNumber: null
    }

    componentWillMount(): void {
        var weekNumber = extractPath('match.params.number', this.props, false);

        this.setState(currentState => {
            return { ...currentState, weekNumber };
        });
    }

    componentDidMount(): void {
        this.props.dispatch(
            createFetchAllUsersAction()
        )
    }

    _renderTableHead(allDatesToRender: Array<Moment>) {
        return (
            <thead>
                <tr>
                    <th>User</th>
                    { allDatesToRender.map((day) => {
                        var dayInMonth = day.format('D');

                        return (
                            <th key={ dayInMonth }>{ dayInMonth }</th>
                        )
                    }) }
                </tr>
            </thead>
        );
    }

    _onDayForUserRefresh(userId: number, day: Moment) {
        this.props.dispatch(
            createFetchTimeEntriesForUserOnDayAction(userId, day)
        );
    }

    _renderTableBody(allDatesToRender: Array<Moment>) {
        var { settings, users, timeEntries } = this.props;

        var userIds = settings.userIds;

        return (
            <tbody>
                { userIds.map((userId: number) => {
                    var user = resolveUser(userId, users);

                    return (
                        <tr key={ userId.toString() }>
                            <th key="0">
                                { user.name }
                            </th>
                            { allDatesToRender.map((day) => {
                                var dayInMonth = day.format('D'),
                                    timeEntriesForUserOnDay = resolveTimeEntriesForUserOnDay(userId, day, timeEntries);

                                return (
                                    <td key={ dayInMonth } className="text-left">
                                        <DayForUser
                                            user={ user }
                                            onRefresh={ this._onDayForUserRefresh.bind(this, userId, day) }
                                            timeEntries={ timeEntriesForUserOnDay }
                                        />
                                    </td>
                                )
                            }) }
                        </tr>
                    );
                }) }
            </tbody>
        );
    }

    render() {
        var { weekNumber } = this.state;
        var { users } = this.props;

        if (weekNumber === false) {
            return <Redirect to={ createHomePath() } />;
        }

        if (!weekNumber || users.length === 0) {
            return <i>Loading..</i>;
        }

        var startOfWeek = getStartOfWeek(weekNumber),
            endOfWeek = getEndOfWeek(weekNumber);

        var allDatesToRender = getAllDatesWithinPeriod(startOfWeek, endOfWeek);

        return (
            <div>
                <h1>Time entries { startOfWeek.format('D MMMM') } - { endOfWeek.format('D MMMM') }</h1>
                <table className="table table-striped">
                    { this._renderTableHead(allDatesToRender) }
                    { this._renderTableBody(allDatesToRender) }
                </table>
            </div>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalState): ReduxProps {
    return {
        settings: globalState.settings,
        users: globalState.users,
        timeEntries: globalState.timeEntries
    };
}

export default requiresHarvestAccessToken(connect(_mapGlobalStateToProps)(WeekDetail));
