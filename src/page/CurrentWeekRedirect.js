// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';
import { createWeekDetailPath } from '../routing/urlGenerator';
import { getCurrentWeekNumber } from '../utility/dateTimeHelper';

var CurrentWeekRedirect = () => {
    var path = createWeekDetailPath(
        getCurrentWeekNumber()
    );

    return <Redirect to={ path } />;
};

export default CurrentWeekRedirect;