import * as React from 'react';
import { connect } from 'react-redux';
import IStore from '../../models/IStore';
import ShowsAction from '../../stores/shows/ShowsAction';
import { selectEpisodes } from '../../selectors/episodes/EpisodesSelector';
import IEpisodeTable from '../../selectors/episodes/models/IEpisodeTable';
import { ReduxProps } from '../../models/ReduxProps';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import EpisodesTable from './components/episodes-table/EpisodesTable';

interface IProps {}
interface IState {}
interface IRouteParams {}
interface IStateToProps {
  readonly episodeTables: IEpisodeTable[];
  readonly isRequesting: boolean;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  episodeTables: selectEpisodes(state),
  isRequesting: selectRequesting(state, [ShowsAction.REQUEST_EPISODES]),
});

class EpisodesPage extends React.Component<IProps & IStateToProps & ReduxProps<any, IRouteParams>, IState> {
  public componentDidMount(): void {
    this.props.dispatch(ShowsAction.requestEpisodes());
  }

  public render(): JSX.Element {
    const { episodeTables, isRequesting } = this.props;

    return (
      <>
        <LoadingIndicator isActive={isRequesting} />
        {episodeTables.map((model: IEpisodeTable) => (
          <EpisodesTable key={model.title} tableData={model} />
        ))}
      </>
    );
  }
}

export { EpisodesPage as Unconnected };
export default connect(mapStateToProps)(EpisodesPage);
