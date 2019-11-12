import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import CastModel from '../../../../../../stores/shows/models/cast/CastModel';

interface IProps {
  readonly cardData: CastModel;
}

export default function ActorCard(props: React.PropsWithChildren<IProps>): React.FunctionComponentElement<IProps> {
  const { cardData } = props;
  const image: string = cardData?.character?.image?.medium;
  const missingImage: string = 'https://react.semantic-ui.com/images/wireframe/image.png';

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
