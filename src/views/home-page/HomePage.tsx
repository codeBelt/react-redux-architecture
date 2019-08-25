import styles from './HomePage.module.scss';

import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import IAction from '../../models/IAction';
import IStore from '../../models/IStore';
import { Card, Icon, Image } from 'semantic-ui-react';
import ShowAction from '../../stores/show/ShowAction';

const CardExampleCard = () => (
  <Card>
    <Image src="" wrapped={true} ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className="date">Joined in 2015</span>
      </Card.Meta>
      <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a href="/">
        <Icon name="user" />
        22 Friends
      </a>
    </Card.Content>
  </Card>
);

interface IProps {}
interface IState {}
interface IStateToProps {}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({});

class HomePage extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {
  public componentDidMount(): void {
    this.props.dispatch(ShowAction.requestShow());
    this.props.dispatch(ShowAction.requestEpisodes());
    this.props.dispatch(ShowAction.requestCast());
  }

  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        Home page
        <CardExampleCard />
      </div>
    );
  }
}

export { HomePage as Unconnected };
export default connect(mapStateToProps)(HomePage);
