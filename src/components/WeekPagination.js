// @flow

import React from 'react';
import { getPreviousWeekNumber, getNextWeekNumber } from '../utility/dateTimeHelper';
import { createWeekDetailPath, createWeekBurndownPath } from '../routing/urlGenerator';
import { Link } from 'react-router-dom';

type Props = {
    currentWeekNumber: number
};

export default function WeekPagination(props: Props) {
    var { currentWeekNumber } = props;

    var previousWeekNumber: number = getPreviousWeekNumber(currentWeekNumber),
        nextWeekNumber: number = getNextWeekNumber(currentWeekNumber);

    return (
        <ul className="list-inline pull-right">
            <li>
                <Link to={ createWeekDetailPath(previousWeekNumber) } className="btn btn-link">
                    <i className="glyphicon glyphicon-step-backward" /> Previous
                </Link>
                <Link to={ createWeekDetailPath(nextWeekNumber) } className="btn btn-link">
                    Next <i className="glyphicon glyphicon-step-forward" />
                </Link>
            </li>
            <li>
                <Link to={ createWeekBurndownPath(currentWeekNumber) } className="btn btn-primary">
                    Burndown
                </Link>
            </li>
        </ul>
    );
}
