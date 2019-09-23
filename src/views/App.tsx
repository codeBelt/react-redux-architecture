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

interface IProps {
  readonly history: History;
  readonly dispatch: Dispatch<IAction<any>>;
}
interface IState {}

export default class App extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    return (
      <ConnectedRouter history={this.props.history}>
        <Suspense fallback={<LoadingIndicator isActive={true} />}>
          <Toasts />
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
