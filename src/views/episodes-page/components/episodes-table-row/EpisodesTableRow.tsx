import React from 'react';
import { Image, Table } from 'semantic-ui-react';
import IEpisodeTableRow from '../../../../selectors/episodes/models/IEpisodeTableRow';

interface IProps {
  readonly rowData: IEpisodeTableRow;
}

const EpisodesTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
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
};

export default EpisodesTableRow;
