// @flow

import axios from 'axios';

const BASE_URL = 'https://api.harvestapp.com/api/v2';
const USER_LIST_PATH = '/users';

export type ApiResponse = Promise<Object | Array<Object>>;
export type ApiListResponse = Promise<Array<Object>>;

export function getAllUsers(accessToken: string): ApiListResponse {
    var userSets = [];

    var fetch = (page) => {
        return new Promise((resolve) => {
            _get(USER_LIST_PATH, accessToken, { page })
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

    return fetch(1)
        .then(() => [].concat(...userSets));
}

function _get(path: string, accessToken: string, queryParams: Object = {}): ApiResponse {
    var url = BASE_URL + path;

    var options = {
        params: queryParams,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Harvest-Account-ID': 153862 //@todo make setting of this
        }
    };

    return axios.get(url, options);
}
