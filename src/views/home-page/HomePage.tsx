import styles from './HomePage.module.scss';

import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import IStore from '../../models/IStore';
import ShowAction from '../../stores/show/ShowAction';
import Actors from './components/actors/Actors';
import MainOverview from './components/main-overview/MainOverview';
import { Divider, Icon, Header } from 'semantic-ui-react';
import ShowModel from '../../stores/show/models/shows/ShowModel';
import { ReduxProps } from '../../models/ReduxProps';

interface IProps {}
interface IState {}
interface IRouteParams {}
interface IStateToProps {
  readonly show: ShowModel | null;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  show: state.show.show,
});

class HomePage extends React.Component<IProps & IStateToProps & ReduxProps<any, IRouteParams>, IState> {
  public componentDidMount(): void {
    this.props.dispatch(ShowAction.requestShow());
    this.props.dispatch(ShowAction.requestCast());
  }

  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        <MainOverview />
        <Divider horizontal>
          <Header as="h4">
            <Icon name="users" /> Cast
          </Header>
        </Divider>
        <Actors />
      </div>
    );
  }
}

export { HomePage as Unconnected };
export default connect(mapStateToProps)(HomePage);
