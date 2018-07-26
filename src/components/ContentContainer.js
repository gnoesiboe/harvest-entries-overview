// @flow

import * as React from 'react';

type Props = {
    children: React.Node
};

var ContentContainer = (props: Props) => {
    return (
        <div className="container-fluid content-container">
            { props.children }
        </div>
    );
};

export default ContentContainer;