// @flow

import React from 'react';
import { extractPath } from '../utility/objectPathHelper';
import { Redirect } from 'react-router-dom';
import { createHomePath } from '../routing/urlGenerator';
import requiresHarvestAccessToken from '../hoc/requiresHarvestAccessToken';

type Props = {
    match: {
        params: {
            number: Number
        }
    }
};

type State = {
    weekNumber: ?Number
};

class WeekDetail extends React.Component<Props, State> {

    state: State = {
        weekNumber: null
    }

    componentDidMount() : void {
        var weekNumber = extractPath('match.params.number', this.props, false);

        this.setState(currentState => {
            return { ...currentState, weekNumber };
        });
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

export default requiresHarvestAccessToken(WeekDetail);
