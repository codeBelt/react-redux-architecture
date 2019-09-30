import styles from './HomePage.module.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import IStore from '../../models/IStore';
import ShowsAction from '../../stores/shows/ShowsAction';
import Actors from './components/actors/Actors';
import MainOverview from './components/main-overview/MainOverview';
import { Divider, Icon, Header } from 'semantic-ui-react';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';

interface IProps {}

const HomePage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ShowsAction.REQUEST_SHOW, ShowsAction.REQUEST_CAST]));

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
};

export default HomePage;
