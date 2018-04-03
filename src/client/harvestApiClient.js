// @flow

import axios from 'axios';
import Moment from 'moment';

export type ApiResponse = Promise<Object | Array<Object>>;
export type ApiListResponse = Promise<Array<Object>>;

const BASE_URL = 'https://api.harvestapp.com/api/v2';

const USER_LIST_PATH = '/users';
const TIME_ENTRIES_LIST_PATH = '/time_entries';

export function getAllUsers(accessToken: string, accountId: string): ApiListResponse {
    var userSets = [];

    var fetch = (page) => {
        return new Promise((resolve) => {
            _get(USER_LIST_PATH, accessToken, accountId, { page })
                .then(response => {

                    // $ExpectError
                    var data = response.data;

                    userSets.push(data.users);

                    if (data.next_page !== null) {
                        fetch(2).then(() => resolve())
                    } else {
                        resolve();
                    }
                });
        });
    };

    return fetch(1).then(() => [].concat(...userSets));
}

export function getTimeEntries(
    accessToken: string,
    accountId: string,
    userId: ?Number,
    from: Moment,
    until: Moment
): ApiListResponse {
    var timeEntries = [];

    var fetch = (page) => {
        return new Promise((resolve) => {
            var queryParams = {
                page,
                user_id: userId,
                is_running: 'false',
                from: from.format('YYYY-MM-DD'),
                to: until.format('YYYY-MM-DD')
            };

            _get(TIME_ENTRIES_LIST_PATH, accessToken, accountId, queryParams)
                .then(response => {

                    // $ExpectError
                    var data = response.data;

                    timeEntries.push(data.time_entries);

                    if (data.next_page !== null) {
                        fetch(2).then(() => resolve())
                    } else {
                        resolve();
                    }
                });
        });
    };

    return fetch(1).then(() => [].concat(...timeEntries));
}

function _get(path: string, accessToken: string, accountId: string, queryParams: Object = {}): ApiResponse {
    var url = BASE_URL + path;

    var options = {
        params: queryParams,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Harvest-Account-ID': accountId
        }
    };

    return axios.get(url, options);
}
