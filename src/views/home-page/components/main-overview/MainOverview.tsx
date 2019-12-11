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
    const { data, error } = this.props.showsStore!.show;

    if (!data || error) {
      return null;
    }

    const image: string = data.image?.medium ?? '';
    const network: string = data.network?.name ?? '';

    return (
      <Item.Group>
        <Item>
          <Item.Image src={image} />
          <Item.Content>
            <Item.Header as="a">{data.name}</Item.Header>
            <Item.Meta>{network}</Item.Meta>
            <Item.Description>
              <div dangerouslySetInnerHTML={{ __html: data.summary }} />
            </Item.Description>
            <Item.Extra>{data.genres.join(' | ')}</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}
