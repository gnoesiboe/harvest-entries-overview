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

type Props = {
    settings: SettingsReducerState,
    dispatch: Dispatch,
    match: {
        params: {
            number: Number
        }
    }
};

type ReduxProps = {
    settings: SettingsReducerState
};

type State = {
    weekNumber: ?Number
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
        var { settings, dispatch } = this.props;

        // @todo check only needed for flow, can we change this?
        if (settings.harvestAccessToken) {
            dispatch(
                createFetchAllUsersAction(settings.harvestAccessToken)
            )
        }
    }

    render() {
        var { weekNumber } = this.state;

        if (weekNumber === null) {
            return null;
        }

        if (weekNumber === false) {
            return <Redirect to={ createHomePath() } />;
        }

        return (
            <div>
                <h1>@todo WeekDetail</h1>
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
