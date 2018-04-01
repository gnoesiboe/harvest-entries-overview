// @flow

import React from 'react';
import SettingsForm from '../components/SettingsForm';
import type { OnSubmitCallback } from '../components/SettingsForm';
import { connect } from 'react-redux';
import type { GlobalState } from '../redux/state/type';
import type { SettingsReducerState } from '../redux/reducer/settingsReducer';
import type { Dispatch } from 'react-redux';
import { createUpdateSettingsAction } from '../redux/action/factory/settingsActionFactory';
import { Redirect } from 'react-router-dom';
import { createHomePath } from '../routing/urlGenerator';

type Props = {
    settings: SettingsReducerState,
    dispatch: Dispatch
};

type ReduxProps = {
    settings: SettingsReducerState
};

type State = {
    redirect: boolean
};

class Settings extends React.Component<Props, State> {

    state: State = {
        redirect: false
    };

    _onFormSubmit: OnSubmitCallback = (harvestAccessToken: string, harvestAccountId: string) => {
        var { dispatch } = this.props;

        dispatch(
            createUpdateSettingsAction(harvestAccessToken, harvestAccountId)
        );

        this.setState(
            currentState => {
                return { ...currentState, redirect: true };
            }
        );
    }

    render() {
        var { settings } = this.props;
        var { redirect } = this.state;

        if (redirect) {
            return <Redirect to={ createHomePath() } />;
        }

        return (
            <div>
                <h1>Settings</h1>
                <SettingsForm
                    harvestAccessToken={ settings.harvestAccessToken }
                    harvestAccountId={ settings.harvestAccountId }
                    onSubmit={ this._onFormSubmit }
                />
            </div>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalState): ReduxProps {
    return {
        settings: globalState.settings
    };
}

export default connect(_mapGlobalStateToProps)(Settings);
