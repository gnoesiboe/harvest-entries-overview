// @flow

import React, { Fragment } from 'react';
import SettingsForm from '../components/SettingsForm';
import type { OnSubmitCallback } from '../components/SettingsForm';
import { connect } from 'react-redux';
import type { GlobalState } from '../redux/state/type';
import type { SettingsReducerState } from '../redux/reducer/settingsReducer';
import type { UsersReducerState } from '../redux/reducer/usersReducer';
import { createUpdateSettingsAction } from '../redux/action/factory/settingsActionFactory';
import { Redirect } from 'react-router-dom';
import { createHomePath } from '../routing/urlGenerator';
import { createFetchAllUsersAction } from '../redux/action/factory/userActionFactory';

type Props = {
    settings: SettingsReducerState,
    users: UsersReducerState,
    dispatch: Dispatch
};

type ReduxProps = {
    settings: SettingsReducerState,
    users: UsersReducerState
};

type State = {
    redirect: boolean
};

class Settings extends React.Component<Props, State> {

    state: State = {
        redirect: false
    };

    componentDidMount() {
        var { settings } = this.props;

        if (!settings.harvestAccessToken && settings.harvestAccountId) {
            return;
        }

        this.props.dispatch(
            createFetchAllUsersAction()
        );
    }

    _onFormSubmit: OnSubmitCallback = (harvestAccessToken: string, harvestAccountId: string, userIds: Array<number>) => {
        var { dispatch } = this.props;

        dispatch(
            createUpdateSettingsAction(harvestAccessToken, harvestAccountId, userIds)
        );

        this.setState(
            currentState => {
                return { ...currentState, redirect: true };
            }
        );
    }

    render() {
        var { settings, users } = this.props;
        var { redirect } = this.state;

        if (redirect) {
            return <Redirect to={ createHomePath() } />;
        }

        return (
            <Fragment>
                <h1>Settings</h1>
                <SettingsForm
                    harvestAccessToken={ settings.harvestAccessToken }
                    harvestAccountId={ settings.harvestAccountId }
                    userIds={ settings.userIds }
                    users={ users }
                    onSubmit={ this._onFormSubmit }
                />
            </Fragment>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalState): ReduxProps {
    return {
        settings: globalState.settings,
        users: globalState.users
    };
}

export default connect(_mapGlobalStateToProps)(Settings);
