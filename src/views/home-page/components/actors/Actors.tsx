import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import IAction from '../../../../models/IAction';
import IStore from '../../../../models/IStore';
import { Card } from 'semantic-ui-react';
import CastModel from '../../../../stores/shows/models/cast/CastModel';
import ShowsAction from '../../../../stores/shows/ShowsAction';
import ActorCard from './components/actor-card/ActorCard';

interface IProps {}
interface IState {}
interface IStateToProps {
  readonly actors: CastModel[];
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  actors: state.shows.actors,
});

class Actors extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {
  public componentDidMount(): void {
    this.props.dispatch(ShowsAction.requestCast());
  }

  public render(): JSX.Element {
    const { actors } = this.props;

    return (
      <Card.Group centered={true}>
        {actors.map((model: CastModel) => (
          <ActorCard key={model.person.name} cardData={model} />
        ))}
      </Card.Group>
    );
  }
}

export { Actors as Unconnected };
export default connect(mapStateToProps)(Actors);
