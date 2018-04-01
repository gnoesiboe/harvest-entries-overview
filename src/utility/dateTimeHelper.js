// @flow

import moment from 'moment';

export function getCurrentWeekNumber(): Number {
    return moment().isoWeek();
}
