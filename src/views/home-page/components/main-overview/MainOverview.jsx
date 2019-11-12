import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from 'semantic-ui-react';
import * as ShowsAction from '../../../../stores/shows/ShowsAction';

export default function MainOverview(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowsAction.requestShow());
  }, [dispatch]);

  const show = useSelector((state) => state.shows.show);

  if (!show) {
    return null;
  }

  const image = show?.image?.medium ?? '';
  const network = show?.network?.name ?? '';

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
