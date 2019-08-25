import * as React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

interface IProps {}
interface IState {}

const Nav = (props: any) => <NavLink exact {...props} activeClassName="active" />;

export default class MainNav extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item as={Nav} to="/" name="home" />
          <Menu.Item as={Nav} to="/episodes" name="Episodes" />
        </Menu>
      </Segment>
    );
  }
}
