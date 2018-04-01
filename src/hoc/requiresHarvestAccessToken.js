// @flow

import * as React from 'react';
import type { GlobalState } from '../redux/state/type';
import { connect } from 'react-redux';
import { isString } from 'lodash';
import { Redirect } from 'react-router-dom';
import { createSupplyAccessTokenPath } from '../routing/urlGenerator';

type Props = {
    harvestAccessToken: ?string
};

type ReduxProps = {
    harvestAccessToken: ?string
};

export default function(CompostedComponent: any ) {
    type State = {
        accessTokenIsSet: boolean
    };

    class RequiresHarvestAccessToken extends React.Component<Props, State> {

        state: State = {
            accessTokenIsSet: false
        };

        componentWillMount() {
            this.setState(currentState => {
                return {
                    ...currentState,
                    accessTokenIsSet: isString(this.props.harvestAccessToken)
                };
            });
        }

        componentWillUpdate(nextProps: Props) {
            this.setState(currentState => {
                return {
                    ...currentState,
                    accessTokenIsSet: isString(nextProps.harvestAccessToken)
                };
            });
        }

        render() {
            if (this.state.accessTokenIsSet === false) {
                return <Redirect to={ createSupplyAccessTokenPath() } />;
            }

            return <CompostedComponent { ...this.props } />
        }
    }

    var mapGlobalStateToProps = function (globalState: GlobalState): ReduxProps {
        return {
            harvestAccessToken: globalState.settings.harvestAccessToken
        };
    }

    return connect(mapGlobalStateToProps)(RequiresHarvestAccessToken);
}
