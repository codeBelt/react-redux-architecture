import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import { oc } from 'ts-optchain';
import ShowsAction from '../../../../stores/shows/ShowsAction';

const mapStateToProps = (state, ownProps) => ({
  actors: state.shows.actors,
});

class Actors extends React.Component {
  componentDidMount() {
    this.props.dispatch(ShowsAction.requestCast());
  }

  render() {
    return <Card.Group centered={true}>{this._renderCards()}</Card.Group>;
  }

  _renderCards() {
    const { actors } = this.props;

    return actors.map((model) => {
      const image = oc(model).character.image.medium('');
      const missingImage = 'https://react.semantic-ui.com/images/wireframe/image.png';

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
    });
  }
}

export { Actors as Unconnected };
export default connect(mapStateToProps)(Actors);
