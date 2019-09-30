import React from 'react';
import { Image, Table } from 'semantic-ui-react';

export default class EpisodesTableRow extends React.PureComponent {
  render() {
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
