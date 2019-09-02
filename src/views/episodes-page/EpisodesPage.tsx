import styles from './EpisodesPage.module.scss';

import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import IStore from '../../models/IStore';
import IAction from '../../models/IAction';

interface IProps {}
interface IState {}
interface IStateToProps {}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({});

class EpisodesPage extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {
  public render(): JSX.Element {
    return <div className={styles.wrapper}>Episodes page</div>;
  }
}

export { EpisodesPage as Unconnected };
export default connect(mapStateToProps)(EpisodesPage);
