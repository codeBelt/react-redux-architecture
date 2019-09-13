import * as React from 'react';
import { connect } from 'react-redux';
import ShowsAction from '../../stores/shows/ShowsAction';
import { selectEpisodes } from '../../selectors/episodes/EpisodesSelector';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import EpisodesTable from './components/episodes-table/EpisodesTable';

const mapStateToProps = (state, ownProps) => ({
  episodeTables: selectEpisodes(state),
  isRequesting: selectRequesting(state, [ShowsAction.REQUEST_EPISODES]),
});

class EpisodesPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(ShowsAction.requestEpisodes());
  }

  render() {
    const { isRequesting, episodeTables } = this.props;

    return (
      <>
        <LoadingIndicator isActive={isRequesting} />
        {episodeTables.map((model) => (
          <EpisodesTable key={model.title} tableData={model} />
        ))}
      </>
    );
  }
}

export { EpisodesPage as Unconnected };
export default connect(mapStateToProps)(EpisodesPage);
