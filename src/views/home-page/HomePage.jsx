import styles from './HomePage.module.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import ShowsAction from '../../stores/shows/ShowsAction';
import Actors from './components/actors/Actors';
import MainOverview from './components/main-overview/MainOverview';
import { Divider, Icon, Header } from 'semantic-ui-react';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';

const mapStateToProps = (state, ownProps) => ({
  isRequesting: selectRequesting(state, [ShowsAction.REQUEST_SHOW, ShowsAction.REQUEST_CAST]),
});

class HomePage extends React.Component {
  render() {
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
