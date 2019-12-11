import React from 'react';
import { Image, Table } from 'semantic-ui-react';
import IEpisodeTableRow from '../../../../stores/shows/computed/IEpisodeTableRow';

interface IProps {
  readonly rowData: IEpisodeTableRow;
}
interface IState {}

export default class EpisodesTableRow extends React.PureComponent<IProps, IState> {
  public render(): JSX.Element {
    const { rowData } = this.props;

    return (
      <Table.Row key={rowData.episode}>
        <Table.Cell>
          <Image src={rowData.image} rounded={true} size="small" />
        </Table.Cell>
        <Table.Cell>{rowData.episode}</Table.Cell>
        <Table.Cell>{rowData.date}</Table.Cell>
        <Table.Cell>{rowData.name}</Table.Cell>
      </Table.Row>
    );
  }
}
