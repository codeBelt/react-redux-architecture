import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import IStore from '../../models/IStore';
import IAction from '../../models/IAction';
import { Table, Header, Image } from 'semantic-ui-react';
import ShowAction from '../../stores/show/ShowAction';
import { getEpisodes } from '../../selectors/episodes/EpisodesSelector';
import IEpisodeTable from '../../selectors/episodes/models/IEpisodeTable';
import IEpisodeTableRow from '../../selectors/episodes/models/IEpisodeTableRow';

interface IProps {}
interface IState {}
interface IStateToProps {
  readonly episodeTables: IEpisodeTable[];
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  episodeTables: getEpisodes(state),
});

class EpisodesPage extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {
  public componentDidMount(): void {
    this.props.dispatch(ShowAction.requestEpisodes());
  }

  public render(): JSX.Element {
    const { episodeTables } = this.props;

    return (
      <>
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
                      <Image src={row.image} rounded size="small" />
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
