// @flow

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import WeekDetail from './page/WeekDetail';
import { createWeekDetailPath, createHomePath, createSettingsPath, createWeekBurndownPath } from './routing/urlGenerator';
import CurrentWeekRedirect from './page/CurrentWeekRedirect';
import Settings from './page/Settings';
import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import ContentContainer from './components/ContentContainer';
import WeekBurndown from './page/WeekBurndown';

type Props = {};

class App extends Component<Props> {

    render() {
        return (
            <div className="app" id="outer-container">
                <BrowserRouter>
                    <div>
                        <Menu>
                            { /* $ExpectError */ }
                            <MenuItem to={ createWeekDetailPath() }>Week detail</MenuItem>

                            { /* $ExpectError */ }
                            <MenuItem to={ createSettingsPath() }>Settings</MenuItem>
                        </Menu>
                        <ContentContainer>
                            <Switch>
                                <Route path={ createHomePath() } exact component={ CurrentWeekRedirect } />
                                <Route path={ createWeekDetailPath() } exact component={ WeekDetail } />
                                <Route path={ createWeekBurndownPath() } exact component={ WeekBurndown } />
                                <Route path={ createSettingsPath() } exact component={ Settings } />
                            </Switch>
                        </ContentContainer>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
