// @flow

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import WeekDetail from './page/WeekDetail';
import { createWeekDetailPath, createHomePath, createSupplyAccessTokenPath } from './routing/urlGenerator';
import CurrentWeekRedirect from './page/CurrentWeekRedirect';
import SupplyAccessToken from './page/SupplyAccessToken';

type Props = {};

class App extends Component<Props> {

    render() {
        return (
            <div className="app">
                <div className="container">
                    <BrowserRouter>
                        <Switch>
                            <Route path={ createHomePath() } exact component={ CurrentWeekRedirect } />
                            <Route path={ createWeekDetailPath() } exact component={ WeekDetail } />
                            <Route path={ createSupplyAccessTokenPath() } exact component={ SupplyAccessToken } />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
