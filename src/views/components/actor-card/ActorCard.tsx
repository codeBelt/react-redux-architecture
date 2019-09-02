import * as React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { oc } from 'ts-optchain';
import CastModel from '../../../stores/show/models/cast/CastModel';

interface IProps {
  readonly actor: CastModel;
}
interface IState {}

export default class ActorCard extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    const { person, character } = this.props.actor;
    const image: string = oc(character).image.medium('');
    const missingImage: string = 'https://react.semantic-ui.com/images/wireframe/image.png';

    return (
      <Card>
        <Image src={image || missingImage} size="small" />
        <Card.Content>
          <Card.Header>{person.name}</Card.Header>
          <Card.Meta>
            <span className="date">Birth date: {person.birthday}</span>
          </Card.Meta>
          <Card.Description>as {character.name}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
