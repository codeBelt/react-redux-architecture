import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import IAction from '../../../../models/IAction';
import IStore from '../../../../models/IStore';
import { Card, Image } from 'semantic-ui-react';
import { oc } from 'ts-optchain';
import CastModel from '../../../../stores/shows/models/cast/CastModel';

interface IProps {}
interface IState {}
interface IStateToProps {
  readonly actors: CastModel[];
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  actors: state.shows.actors,
});

class Actors extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {
  public render(): JSX.Element {
    const { actors } = this.props;

    return (
      <Card.Group centered={true}>
        {actors.map((model: CastModel) => {
          const image: string = oc(model).character.image.medium('');
          const missingImage: string = 'https://react.semantic-ui.com/images/wireframe/image.png';

          return (
            <Card key={model.person.name}>
              <Card.Content>
                <Image floated="right" size="mini" src={image || missingImage} />
                <Card.Header>{model.person.name}</Card.Header>
                <Card.Meta>as {model.character.name}</Card.Meta>
                <Card.Description>
                  <strong>Birth date:</strong> {model.person.birthday}
                </Card.Description>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    );
  }
}

export { Actors as Unconnected };
export default connect(mapStateToProps)(Actors);
