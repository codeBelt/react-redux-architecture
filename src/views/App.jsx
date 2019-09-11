import React, { Suspense, lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import RouteEnum from '../constants/RouteEnum';
import MainNav from './components/main-nav/MainNav';

const HomePage = lazy(() => import('./home-page/HomePage'));
const NotFoundPage = lazy(() => import('./not-found-page/NotFoundPage'));
const EpisodesPage = lazy(() => import('./episodes-page/EpisodesPage'));

export default class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Suspense fallback={<div>Loading...</div>}>
          <MainNav />
          <Switch>
            <Route exact={true} path={RouteEnum.Home} component={HomePage} />
            <Route path={RouteEnum.Episodes} component={EpisodesPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </ConnectedRouter>
    );
  }
}
