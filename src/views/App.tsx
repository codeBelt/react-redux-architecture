import React, { Suspense, lazy } from 'react';
import { History } from 'history';
import { Route, Switch, Router } from 'react-router-dom';
import RouteEnum from '../constants/RouteEnum';
import MainNav from './components/main-nav/MainNav';
import LoadingIndicator from './components/loading-indicator/LoadingIndicator';

const HomePage = lazy(() => import('./home-page/HomePage'));
const NotFoundPage = lazy(() => import('./not-found-page/NotFoundPage'));
const EpisodesPage = lazy(() => import('./episodes-page/EpisodesPage'));
const AboutPage = lazy(() => import('./about-page/AboutPage'));

interface IProps {
  readonly history: History;
}
interface IState {}

export default class App extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    return (
      <Router history={this.props.history}>
        <Suspense fallback={<LoadingIndicator isActive={true} />}>
          <MainNav />
          <Switch>
            <Route exact={true} path={RouteEnum.Home} component={HomePage} />
            <Route path={RouteEnum.Episodes} component={EpisodesPage} />
            <Route path={RouteEnum.About} component={AboutPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
