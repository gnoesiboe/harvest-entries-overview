// @flow

import React from 'react';
import { extractPath } from '../utility/objectPathHelper';
import { Redirect } from 'react-router-dom';
import { createHomePath } from '../routing/urlGenerator';
import requiresHarvestAccessToken from '../hoc/requiresHarvestAccessToken';
import { connect } from 'react-redux';
import type { GlobalState } from '../redux/state/type';
import type { SettingsReducerState } from '../redux/reducer/settingsReducer';
import type { Dispatch } from 'react-redux';
import { createFetchAllUsersAction } from '../redux/action/factory/userActionFactory';
import { getStartOfWeek, getEndOfWeek, getAllDatesWithinPeriod } from '../utility/dateTimeHelper';
import Moment from 'moment';

type Props = {
    settings: SettingsReducerState,
    dispatch: Dispatch,
    match: {
        params: {
            number: number
        }
    }
};

type ReduxProps = {
    settings: SettingsReducerState
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

    _renderTableBody(allDatesToRender: Array<Moment>) {
        var userIds = this.props.settings.userIds;

        return (
            <tbody>
                { userIds.map((userId: Number) => {
                    return (
                        <tr key={ userId.toString() }>
                            { allDatesToRender.map((day) => {
                                var dayInMonth = day.format('D');

                                return (
                                    <td key={ dayInMonth }>@todo</td>
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

        if (weekNumber === false) {
            return <Redirect to={ createHomePath() } />;
        }

        if (!weekNumber) {
            return null;
        }

        var startOfWeek = getStartOfWeek(weekNumber),
            endOfWeek = getEndOfWeek(weekNumber);

        var allDatesToRender = getAllDatesWithinPeriod(startOfWeek, endOfWeek);

        return (
            <div>
                <h1>Time entries { startOfWeek.format('D MMMM') } - { endOfWeek.format('D MMMM') }</h1>
                <table className="table">
                    { this._renderTableHead(allDatesToRender) }
                    { this._renderTableBody(allDatesToRender) }
                </table>
            </div>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalState): ReduxProps {
    return {
        settings: globalState.settings
    };
}

export default requiresHarvestAccessToken(connect(_mapGlobalStateToProps)(WeekDetail));
