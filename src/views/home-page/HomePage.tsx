import styles from './HomePage.module.scss';

import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import IAction from '../../models/IAction';
import IStore from '../../models/IStore';
import ShowAction from '../../stores/show/ShowAction';
import Actors from './components/actors/Actors';
import ShowModel from '../../stores/show/models/ShowModel';
import MainOverview from './components/main-overview/MainOverview';
import { Divider, Icon, Header } from 'semantic-ui-react';

interface IProps {}
interface IState {}
interface IStateToProps {
  readonly show: ShowModel | null;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  show: state.show.show,
});

class HomePage extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {
  public componentDidMount(): void {
    this.props.dispatch(ShowAction.requestShow('74'));
    this.props.dispatch(ShowAction.requestCast('74'));
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
