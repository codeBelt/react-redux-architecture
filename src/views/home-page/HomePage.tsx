import styles from './HomePage.module.scss';

import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import IAction from '../../models/IAction';
import IStore from '../../models/IStore';
import { Button, Card, Container, Header, Icon, Image, Menu, Responsive, SegmentGroup, Visibility } from 'semantic-ui-react';
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

const HomepageHeading = ({ mobile }: any) => (
  <Container text>
    <Header
      as="h1"
      content="Imagine-a-Company"
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as="h2"
      content="Do whatever you want when you want to."
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size="huge">
      Get Started
      <Icon name="arrow right" />
    </Button>
  </Container>
);

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends React.Component {
  state = {
    fixed: false,
  };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <SegmentGroup inverted textAlign="center" style={{ minHeight: 700, padding: '1em 0em' }} vertical>
            <Menu fixed={fixed ? 'top' : undefined} inverted={!fixed} pointing={!fixed} secondary={!fixed} size="large">
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item as="a">Work</Menu.Item>
                <Menu.Item as="a">Company</Menu.Item>
                <Menu.Item as="a">Careers</Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
                    Log in
                  </Button>
                  <Button as="a" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </SegmentGroup>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

interface IProps {}

interface IState {}

interface IStateToProps {}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({});

class HomePage extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {
  public componentDidMount(): void {
    this.props.dispatch(ShowAction.requestShow('74'));
    this.props.dispatch(ShowAction.requestEpisodes('74'));
    this.props.dispatch(ShowAction.requestCast('74'));
  }

  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        <DesktopContainer>
          hey
          <CardExampleCard />
        </DesktopContainer>
      </div>
    );
  }
}

export { HomePage as Unconnected };
export default connect(mapStateToProps)(HomePage);
