// @flow

import React from 'react';
import LoadingIndicator from 'react-loading-indicator';

export default function LoadingButton() {
    return (
        <button className="btn btn-link" disabled={ true }>
            <LoadingIndicator/>
        </button>
    );
}
