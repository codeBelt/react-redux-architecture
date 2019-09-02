import styles from './EpisodesPage.module.scss';

import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import IStore from '../../models/IStore';
import IAction from '../../models/IAction';
import ShowAction from '../../stores/show/ShowAction';
import EpisodeModel from '../../stores/show/models/episodes/EpisodeModel';

interface IProps {}
interface IState {}
interface IStateToProps {
  readonly episodes: EpisodeModel[];
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  episodes: state.show.episodes,
});

class EpisodesPage extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {
  public componentDidMount(): void {
    this.props.dispatch(ShowAction.requestEpisodes());
  }

  public render(): JSX.Element {
    console.log(`episodes`, this.props.episodes);

    return <div className={styles.wrapper}>Episodes page</div>;
  }
}

export { EpisodesPage as Unconnected };
export default connect(mapStateToProps)(EpisodesPage);
