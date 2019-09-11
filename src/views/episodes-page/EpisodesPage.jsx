import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Header, Image } from 'semantic-ui-react';
import ShowsAction from '../../stores/shows/ShowsAction';
import { selectEpisodes } from '../../selectors/episodes/EpisodesSelector';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';

const mapStateToProps = (state, ownProps) => ({
  episodeTables: selectEpisodes(state),
  isRequesting: selectRequesting(state, [ShowsAction.REQUEST_EPISODES]),
});

class EpisodesPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(ShowsAction.requestEpisodes());
  }

  render() {
    const { isRequesting } = this.props;

    return (
      <>
        <LoadingIndicator isActive={isRequesting} />
        {this._renderTableGroup()}
      </>
    );
  }

  _renderTableGroup() {
    const { episodeTables } = this.props;

    return episodeTables.map((model) => (
      <div key={model.title}>
        <Header as="h2">{model.title}</Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>Scene</Table.HeaderCell>
              <Table.HeaderCell>Episode</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this._renderTableRow(model.rows)}</Table.Body>
        </Table>
      </div>
    ));
  }

  _renderTableRow(rows) {
    return rows.map((row) => (
      <Table.Row key={row.episode}>
        <Table.Cell>
          <Image src={row.image} rounded={true} size="small" />
        </Table.Cell>
        <Table.Cell>{row.episode}</Table.Cell>
        <Table.Cell>{row.date}</Table.Cell>
        <Table.Cell>{row.name}</Table.Cell>
      </Table.Row>
    ));
  }
}

export { EpisodesPage as Unconnected };
export default connect(mapStateToProps)(EpisodesPage);
