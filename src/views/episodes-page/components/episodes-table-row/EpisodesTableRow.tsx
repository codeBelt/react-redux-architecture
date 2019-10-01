import React from 'react';
import { Image, Table } from 'semantic-ui-react';
import IEpisodeTableRow from '../../../../selectors/episodes/models/IEpisodeTableRow';

interface IProps {
  readonly rowData: IEpisodeTableRow;
}

export default function EpisodesTableRow(props: React.PropsWithChildren<IProps>): React.FunctionComponentElement<IProps> {
  const { rowData } = props;

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
