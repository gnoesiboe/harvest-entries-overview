// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';
import { createWeekDetailPath } from '../routing/urlGenerator';
import { getCurrentWeekNumber } from '../utility/dateTimeHelper';

type Props = {};

export default class CurrentWeekRedirect extends React.Component<Props> {

    render() {
        var path = createWeekDetailPath(
            getCurrentWeekNumber()
        );

        return <Redirect to={ path } />;
    }
}
