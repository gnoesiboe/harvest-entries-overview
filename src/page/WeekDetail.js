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
import { getStartOfWeek, getEndOfWeek, getAllDatesWithinPeriod } from '../utility/dateTimeHelper';
import Moment from 'moment';
import DayForUser from '../lib/forms/component/DayForUser';
import { resolveUser } from '../resolver/userResolver';
import WeekPagination from '../components/WeekPagination';

type Props = {
    settings: SettingsReducerState,
    users: UsersReducerState,
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
};

type State = {
    weekNumber: ?number | boolean
};

const COLUMN_WIDTH = 100 / 8;

class WeekDetail extends React.Component<Props, State> {

    state: State = {
        weekNumber: null
    };

    componentDidMount(): void {
        this.props.dispatch(
            createFetchAllUsersAction()
        )
    }

    static _extractWeekNumberFromRoutingParams(props: Props): number | boolean {
        return extractPath('match.params.number', props, false);
    }

    // noinspection JSUnusedGlobalSymbols
    static getDerivedStateFromProps(nextProps: Props, prevState: State): ?State {
        var currentWeekNumber = prevState.weekNumber,
            nextWeekNumber = WeekDetail._extractWeekNumberFromRoutingParams(nextProps);

        if (currentWeekNumber !== nextWeekNumber) {
            return {
                weekNumber: nextWeekNumber
            };
        }

        return null;
    }

    _renderTableHead(allDatesToRender: Array<Moment>) {
        return (
            <thead>
                <tr>
                    <th style={{ width: `${COLUMN_WIDTH}%` }}>User</th>
                    { allDatesToRender.map((day) => {
                        var dayInMonth = day.format('D MMM');

                        return (
                            <th key={ dayInMonth } style={{ width: `${COLUMN_WIDTH}%` }}>
                                { dayInMonth }
                            </th>
                        )
                    }) }
                </tr>
            </thead>
        );
    }

    _renderTableBody(allDatesToRender: Array<Moment>) {
        var { settings, users } = this.props;

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
                                var dayInMonth = day.format('D');

                                return (
                                    <td key={ dayInMonth } className="text-left">
                                        <DayForUser
                                            user={ user }
                                            day={ day }
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

    _renderWeekPagination() {
        var { weekNumber } = this.state;

        if (!weekNumber) {
            return null;
        }

        return <WeekPagination currentWeekNumber={ parseInt(weekNumber, 10) } />
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

        var startOfWeek = getStartOfWeek(parseInt(weekNumber, 10)),
            endOfWeek = getEndOfWeek(parseInt(weekNumber, 10));

        var allDatesToRender = getAllDatesWithinPeriod(startOfWeek, endOfWeek);

        return (
            <div>
                { this._renderWeekPagination() }
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
        users: globalState.users
    };
}

export default requiresHarvestAccessToken(connect(_mapGlobalStateToProps)(WeekDetail));
