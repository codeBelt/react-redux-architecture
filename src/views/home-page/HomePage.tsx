import styles from './HomePage.module.scss';

import React from 'react';
import Actors from './components/actors/Actors';
import MainOverview from './components/main-overview/MainOverview';
import { Divider, Icon, Header } from 'semantic-ui-react';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';

interface IProps {}
interface IState {}

export default class HomePage extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        <LoadingIndicator isActive={false}>
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
