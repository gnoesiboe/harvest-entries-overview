// @flow

import * as React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    to: string,
    children: React.Node,
    onClick: Function
};

class Menuitem extends React.PureComponent<Props>{

    _onClick = (event: Event): boolean => {
        this.props.onClick();

        return true;
    }

    render () {
        var { to, children } = this.props;

        return (
            <div onClick={ this._onClick }>
                <NavLink to={ to }>
                    { children }
                </NavLink>
            </div>
        );
    }
};

export default Menuitem;