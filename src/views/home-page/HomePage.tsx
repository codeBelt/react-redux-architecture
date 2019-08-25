import styles from './HomePage.module.scss';

import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import IAction from '../../models/IAction';
import IStore from '../../models/IStore';

interface IProps {}
interface IState {}
interface IStateToProps {}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({});

class HomePage extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {
  public render(): JSX.Element {
    return <div className={styles.wrapper}>Home page</div>;
  }
}

export { HomePage as Unconnected };
export default connect(mapStateToProps)(HomePage);
