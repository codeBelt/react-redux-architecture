import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import ShowsAction from '../../../../stores/shows/ShowsAction';
import ActorCard from './components/ActorCard';

const mapStateToProps = (state, ownProps) => ({
  actors: state.shows.actors,
});

class Actors extends React.Component {
  componentDidMount() {
    this.props.dispatch(ShowsAction.requestCast());
  }

  render() {
    const { actors } = this.props;

    return (
      <Card.Group centered={true}>
        {actors.map((model) => (
          <ActorCard key={model.person.name} cardData={model} />
        ))}
      </Card.Group>
    );
  }
}

export { Actors as Unconnected };
export default connect(mapStateToProps)(Actors);
