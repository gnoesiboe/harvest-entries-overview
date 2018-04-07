// @flow

import React from 'react';
import Moment from 'moment';
import type { UsersReducerState } from '../redux/reducer/usersReducer';
import { resolveUser } from '../resolver/userResolver';
import DayForUser from '../lib/forms/component/DayForUser';

type Props = {
    userIds: Array<number>,
    users: UsersReducerState,
    dates: Array<Moment>
};

const COLUMN_WIDTH = 100 / 8;

export default class WeekEntriesTable extends React.Component<Props> {

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
