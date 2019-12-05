import React from 'react';
import { Item } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../../../RootStore';

interface IProps {
  rootStore?: RootStore;
}
interface IState {}

@inject('rootStore')
@observer
export default class MainOverview extends React.Component<IProps, IState> {
  public componentDidMount(): void {
    this.props.rootStore?.userStore.requestShow();
  }

  public render(): JSX.Element | null {
    const { show } = this.props.rootStore?.userStore!;

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
