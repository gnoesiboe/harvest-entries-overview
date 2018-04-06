// @flow

import React from 'react';

type Props = {
    onClick: Function
};

export default function RefreshButton(props: Props) {
    var { onClick } = props;

    return (
        <button className="btn btn-link" onClick={ onClick }>
            <i className="glyphicon glyphicon-refresh" />
        </button>
    );
}
