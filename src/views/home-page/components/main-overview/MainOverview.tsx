import React from 'react';
import { Item } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import ShowsStore from '../../../../stores/shows/ShowsStore';

interface IProps {
  showsStore?: ShowsStore;
}
interface IState {}

@inject('showsStore')
@observer
export default class MainOverview extends React.Component<IProps, IState> {
  public componentDidMount(): void {
    this.props.showsStore!.requestShow();
  }

  public render(): JSX.Element | null {
    const { show } = this.props.showsStore!;

    if (!show) {
      return null;
    }

    const image: string = show?.image?.medium ?? '';
    const network: string = show?.network?.name ?? '';

    return (
      <Item.Group>
        <Item>
          <Item.Image src={image} />
          <Item.Content>
            <Item.Header as="a">{show.name}</Item.Header>
            <Item.Meta>{network}</Item.Meta>
            <Item.Description>
              <div dangerouslySetInnerHTML={{ __html: show.summary }} />
            </Item.Description>
            <Item.Extra>{show.genres.join(' | ')}</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}
