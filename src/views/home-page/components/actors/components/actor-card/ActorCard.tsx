import * as React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { oc } from 'ts-optchain';
import CastModel from '../../../../../../stores/shows/models/cast/CastModel';

interface IProps {
  readonly cardData: CastModel;
}
interface IState {}

export default class ActorCard extends React.PureComponent<IProps, IState> {
  public render(): JSX.Element {
    const { cardData } = this.props;
    const image = oc(cardData).character.image.medium('');
    const missingImage = 'https://react.semantic-ui.com/images/wireframe/image.png';

    return (
      <Card key={cardData.person.name}>
        <Card.Content>
          <Image floated="right" size="mini" src={image || missingImage} />
          <Card.Header>{cardData.person.name}</Card.Header>
          <Card.Meta>as {cardData.character.name}</Card.Meta>
          <Card.Description>
            <strong>Birth date:</strong> {cardData.person.birthday}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
