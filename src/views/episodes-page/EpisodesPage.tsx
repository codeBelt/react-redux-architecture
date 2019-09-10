import * as React from 'react';
import { connect } from 'react-redux';
import IStore from '../../models/IStore';
import { Table, Header, Image } from 'semantic-ui-react';
import ShowsAction from '../../stores/shows/ShowsAction';
import { selectEpisodes } from '../../selectors/episodes/EpisodesSelector';
import IEpisodeTable from '../../selectors/episodes/models/IEpisodeTable';
import IEpisodeTableRow from '../../selectors/episodes/models/IEpisodeTableRow';
import { ReduxProps } from '../../models/ReduxProps';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';

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
              <Table.Body>
                {model.rows.map((row: IEpisodeTableRow) => (
                  <Table.Row key={row.episode}>
                    <Table.Cell>
                      <Image src={row.image} rounded={true} size="small" />
                    </Table.Cell>
                    <Table.Cell>{row.episode}</Table.Cell>
                    <Table.Cell>{row.date}</Table.Cell>
                    <Table.Cell>{row.name}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        ))}
      </>
    );
  }
}

export { EpisodesPage as Unconnected };
export default connect(mapStateToProps)(EpisodesPage);
