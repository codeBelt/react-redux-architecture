import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import EpisodesTableRow from '../episodes-table-row/EpisodesTableRow';
import IEpisodeTable from '../../../../selectors/episodes/models/IEpisodeTable';
import IEpisodeTableRow from '../../../../selectors/episodes/models/IEpisodeTableRow';

interface IProps {
  readonly tableData: IEpisodeTable;
}

export default function EpisodesTable(props: React.PropsWithChildren<IProps>): React.FunctionComponentElement<IProps> {
  const { tableData } = props;

  return (
    <div key={tableData.title}>
      <Header as="h2">{tableData.title}</Header>
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
          {tableData.rows.map((model: IEpisodeTableRow) => (
            <EpisodesTableRow key={model.episode} rowData={model} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
