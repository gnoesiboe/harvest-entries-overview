// @flow

import React from 'react';
import { bubble as BurgerMenu } from 'react-burger-menu';
import MenuItem from './MenuItem';
import { createSettingsPath, createHomePath } from './../routing/urlGenerator';

type Props = {};

type Styles = {
    [string]: {
        [string]: string
    }
};

type State = {
    open: boolean
};

type MenuStateChange = {
    isOpen: boolean
};

var styles: Styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '25px',
        height: '25px',
        left: '20px',
        top: '20px'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
};

class Menu extends React.Component<Props, State> {

    state: State = {
        open: false
    };

    _onStateChange = (stateChange: MenuStateChange) => {
        this.setState((currentState: State) => ({ ...currentState, open: stateChange.isOpen }));
    }

    _closeMenu() {
        this.setState((currentState: State) => ({ ...currentState, open: false }));
    }

    _onItemClick = () => {
        console.log('on item click');

        this._closeMenu();
    }

    render() {
        var { open } = this.state;

        console.log('open', open);

        return (
            <BurgerMenu 
                pageWrapId="outer-container" 
                styles={ styles }
                isOpen={ open }
                onStateChange={ this._onStateChange }
            >
                <ul>
                    <li><MenuItem onClick={ this._onItemClick } to={ createHomePath() }>Week detail</MenuItem></li>
                    <li><MenuItem onClick={ this._onItemClick } to={ createSettingsPath() }>Settings</MenuItem></li>
                </ul>
            </BurgerMenu>
        );
    }
}

export default Menu;