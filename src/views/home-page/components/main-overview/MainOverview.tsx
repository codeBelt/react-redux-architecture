import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '../../../../models/IStore';
import { Item } from 'semantic-ui-react';
import ShowModel from '../../../../stores/shows/models/shows/ShowModel';
import * as ShowsAction from '../../../../stores/shows/ShowsAction';
import { Dispatch } from 'redux';

interface IProps {}

const MainOverview: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowsAction.requestShow());
  }, [dispatch]);

  const show: ShowModel | null = useSelector((state: IStore) => state.shows.show);

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
};

export default MainOverview;
