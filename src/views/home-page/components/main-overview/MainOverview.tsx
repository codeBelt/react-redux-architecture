import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '../../../../models/IStore';
import { Item } from 'semantic-ui-react';
import { oc } from 'ts-optchain';
import ShowModel from '../../../../stores/shows/models/shows/ShowModel';
import * as ShowsAction from '../../../../stores/shows/ShowsAction';
import { Dispatch } from 'redux';

interface IProps {}

export default function MainOverview(props: React.PropsWithChildren<IProps>): React.FunctionComponentElement<IProps> | null {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowsAction.requestShow());
  }, [dispatch]);

  const show: ShowModel | null = useSelector((state: IStore) => state.shows.show);

  if (!show) {
    return null;
  }

  const image: string = oc(show).image.medium('');
  const network: string = oc(show).network.name('');

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
