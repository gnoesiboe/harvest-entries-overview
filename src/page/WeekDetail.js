// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';
import { createHomePath } from '../routing/urlGenerator';
import requiresHarvestAccessToken from '../hoc/requiresHarvestAccessToken';
import { connect } from 'react-redux';
import type { GlobalState } from '../redux/state/type';
import type { SettingsReducerState } from '../redux/reducer/settingsReducer';
import type { UsersReducerState } from '../redux/reducer/usersReducer';
import { createFetchAllUsersAction } from '../redux/action/factory/userActionFactory';
import { getStartOfWeek, getEndOfWeek, getAllDatesWithinPeriod } from '../utility/dateTimeHelper';
import WeekPagination from '../components/WeekPagination';
import WeekEntriesTable from '../components/WeekEntriesTable';
import { extractWeekNumberFromRouteParams } from '../utility/routeParamExtractor';

type Props = {
    weekNumber: ?number,
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
    weekNumber: ?number,
    settings: SettingsReducerState,
    users: UsersReducerState,
};

class WeekDetail extends React.Component<Props> {

    componentDidMount(): void {
        var { dispatch } = this.props;

        dispatch(createFetchAllUsersAction());
    }

    _renderWeekPagination() {
        var { weekNumber } = this.props;

        if (!weekNumber) {
            return null;
        }

        return <WeekPagination currentWeekNumber={ parseInt(weekNumber, 10) } />
    }

    render() {
        var { weekNumber, users, settings } = this.props;

        if (!weekNumber) {
            return <Redirect to={ createHomePath() } />;
        }

        if (users.length === 0) {
            return <i>Loading..</i>;
        }

        var startOfWeek = getStartOfWeek(parseInt(weekNumber, 10)),
            endOfWeek = getEndOfWeek(parseInt(weekNumber, 10));

        var allDatesToRender = getAllDatesWithinPeriod(startOfWeek, endOfWeek);

        return (
            <div>
                { this._renderWeekPagination() }
                <h1>Time entries { startOfWeek.format('D MMMM') } - { endOfWeek.format('D MMMM') }</h1>
                <WeekEntriesTable
                    userIds={ settings.userIds }
                    dates={ allDatesToRender }
                    weekNumber={ parseInt(weekNumber, 10) }
                />
            </div>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalState, props: Props): ReduxProps {
    return {
        weekNumber: extractWeekNumberFromRouteParams(props, 'number'),
        settings: globalState.settings,
        users: globalState.users
    };
}

export default requiresHarvestAccessToken(connect(_mapGlobalStateToProps)(WeekDetail));
