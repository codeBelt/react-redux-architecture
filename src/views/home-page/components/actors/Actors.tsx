import React from 'react';
import { Card } from 'semantic-ui-react';
import CastModel from '../../../../stores/shows/models/cast/CastModel';
import ActorCard from './components/actor-card/ActorCard';
import { inject, observer } from 'mobx-react';
import ShowsStore from '../../../../stores/shows/ShowsStore';

interface IProps {
  showsStore?: ShowsStore;
}
interface IState {}

@inject('showsStore')
@observer
export default class Actors extends React.Component<IProps, IState> {
  public componentDidMount(): void {
    this.props.showsStore!.requestCast();
  }

  public render(): JSX.Element {
    const { actors } = this.props.showsStore!;

    return (
      <Card.Group centered={true}>
        {actors.map((model: CastModel) => (
          <ActorCard key={model.person.name} cardData={model} />
        ))}
      </Card.Group>
    );
  }
}
