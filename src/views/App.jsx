import React, { Suspense, lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import RouteEnum from '../constants/RouteEnum';
import MainNav from './components/main-nav/MainNav';
import LoadingIndicator from './components/loading-indicator/LoadingIndicator';
import Toasts from './components/toasts/Toasts';

const HomePage = lazy(() => import('./home-page/HomePage'));
const EpisodesPage = lazy(() => import('./episodes-page/EpisodesPage'));
const AboutPage = lazy(() => import('./about-page/AboutPage'));
const NotFoundPage = lazy(() => import('./not-found-page/NotFoundPage'));

export default class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Suspense fallback={<LoadingIndicator isActive={true} />}>
          <MainNav />
          <Switch>
            <Route exact={true} path={RouteEnum.Home} component={HomePage} />
            <Route path={RouteEnum.Episodes} component={EpisodesPage} />
            <Route path={RouteEnum.About} component={AboutPage} />
            <Route component={NotFoundPage} />
          </Switch>
          <Toasts />
        </Suspense>
      </ConnectedRouter>
    );
  }
}
