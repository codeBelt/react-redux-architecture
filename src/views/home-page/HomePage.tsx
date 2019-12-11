import styles from './HomePage.module.scss';

import React from 'react';
import Actors from './components/actors/Actors';
import MainOverview from './components/main-overview/MainOverview';
import { Divider, Icon, Header } from 'semantic-ui-react';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { RouteComponentProps } from 'react-router-dom';
import ShowsStore from '../../stores/shows/ShowsStore';
import { inject, observer } from 'mobx-react';

interface IRouteParams {}
interface IProps extends RouteComponentProps<IRouteParams> {
  showsStore?: ShowsStore;
}
interface IState {}

@inject('showsStore')
@observer
export default class HomePage extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    const isRequesting = this.props.showsStore!.isRequestingShowAndCast;

    return (
      <div className={styles.wrapper}>
        <LoadingIndicator isActive={isRequesting}>
          <MainOverview />
          <Divider horizontal={true}>
            <Header as="h4">
              <Icon name="users" /> Cast
            </Header>
          </Divider>
          <Actors />
        </LoadingIndicator>
      </div>
    );
  }
}
