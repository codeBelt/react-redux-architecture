import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '../../../../models/IStore';
import { Card } from 'semantic-ui-react';
import CastModel from '../../../../stores/shows/models/cast/CastModel';
import * as ShowsAction from '../../../../stores/shows/ShowsAction';
import ActorCard from './components/actor-card/ActorCard';
import { Dispatch } from 'redux';

interface IProps {}

const Actors: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowsAction.requestCast());
  }, [dispatch]);

  const actors: CastModel[] = useSelector((state: IStore) => state.shows.actors);

  return (
    <Card.Group centered={true}>
      {actors.map((model: CastModel) => (
        <ActorCard key={model.person.name} cardData={model} />
      ))}
    </Card.Group>
  );
};

export default Actors;
