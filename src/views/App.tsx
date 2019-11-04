import React, { Suspense, lazy } from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';
import IAction from '../models/IAction';
import RouteEnum from '../constants/RouteEnum';
import MainNav from './components/main-nav/MainNav';
import LoadingIndicator from './components/loading-indicator/LoadingIndicator';
import Toasts from './components/toasts/Toasts';

const HomePage = lazy(() => import('./home-page/HomePage'));
const NotFoundPage = lazy(() => import('./not-found-page/NotFoundPage'));
const EpisodesPage = lazy(() => import('./episodes-page/EpisodesPage'));
const AboutPage = lazy(() => import('./about-page/AboutPage'));

interface IProps {
  readonly history: History;
  readonly dispatch: Dispatch<IAction<any>>;
}

export default function App(props: React.PropsWithChildren<IProps>): JSX.Element {
  return (
    <ConnectedRouter history={props.history}>
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
