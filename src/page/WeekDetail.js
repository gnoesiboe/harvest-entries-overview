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
import { getStartOfWeek, getEndOfWeek } from '../utility/dateTimeHelper';

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

        return (
            <div>
                <h1>Time entries { startOfWeek.format('D MMMM') } - { endOfWeek.format('D MMMM') }</h1>
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
