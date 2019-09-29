import styles from './HomePage.module.scss';

import React from 'react';
import { connect } from 'react-redux';
import IStore from '../../models/IStore';
import ShowsAction from '../../stores/shows/ShowsAction';
import Actors from './components/actors/Actors';
import MainOverview from './components/main-overview/MainOverview';
import { Divider, Icon, Header } from 'semantic-ui-react';
import { ReduxProps } from '../../models/ReduxProps';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';

interface IProps {}
interface IState {}
interface IRouteParams {}
interface IStateToProps {
  readonly isRequesting: boolean;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  isRequesting: selectRequesting(state, [ShowsAction.REQUEST_SHOW, ShowsAction.REQUEST_CAST]),
});

class HomePage extends React.Component<IProps & IStateToProps & ReduxProps<any, IRouteParams>, IState> {
  public render(): JSX.Element {
    const { isRequesting } = this.props;

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

export { HomePage as Unconnected };
export default connect(mapStateToProps)(HomePage);
