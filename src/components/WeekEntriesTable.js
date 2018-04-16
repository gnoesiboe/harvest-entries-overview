// @flow

import React from 'react';
import Moment from 'moment';
import type { UsersReducerState } from '../redux/reducer/usersReducer';
import { resolveUser } from '../resolver/userResolver';
import DayForUser from '../lib/forms/component/DayForUser';
import { connect } from 'react-redux';
import type { GlobalState } from '../redux/state/type';
import { createFetchTimeEntriesForUserInWeekAction } from '../redux/action/factory/timeEntryActionFactory';

type Props = {
    userIds: Array<number>,
    users: UsersReducerState,
    dates: Array<Moment>,
    dispatch: Function,
    weekNumber: number
};

type ReduxProps = {
    users: UsersReducerState,
};

const COLUMN_WIDTH = 100 / 8;

class WeekEntriesTable extends React.Component<Props> {

    componentDidMount() {
        this._fetchTimeEntriesForAllUsers();
    }

    _fetchTimeEntriesForAllUsers(): void {
        var { userIds } = this.props;

        userIds.forEach(userId => this._fetchTimeEntriesForUser(userId));
    }

    _fetchTimeEntriesForUser = (userId: number): void => {
        var { dispatch, weekNumber } = this.props;

        dispatch(
            createFetchTimeEntriesForUserInWeekAction(userId, weekNumber)
        );
    }

    _renderTableHead() {
        var { dates } = this.props;

        return (
            <thead>
                <tr>
                    <th style={{ width: `${COLUMN_WIDTH}%` }}>User</th>
                    { dates.map((day) => {
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

    _renderTableBody() {
        var { userIds, users, dates } = this.props;

        return (
            <tbody>
                { userIds.map((userId: number) => {
                    var user = resolveUser(userId, users);

                    return (
                        <tr key={ userId.toString() }>
                            <th key="0">
                                { user.name }
                            </th>
                            { dates.map((day) => {
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

    render() {
        return (
            <table className="table table-striped">
                { this._renderTableHead() }
                { this._renderTableBody() }
            </table>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalState): ReduxProps {
    return {
        users: globalState.users
    };
}

export default connect(_mapGlobalStateToProps)(WeekEntriesTable);
