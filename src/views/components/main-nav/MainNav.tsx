import * as React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface IProps {}
interface IState {}

const Nav = (props: NavLinkProps) => <NavLink exact={true} {...props} activeClassName="active" />;

export default class MainNav extends React.PureComponent<IProps, IState> {
  public render(): JSX.Element {
    return (
      <Segment inverted={true}>
        <Menu inverted={true} pointing={true} secondary={true}>
          <Menu.Item as={Nav} to="/" name="home" />
          <Menu.Item as={Nav} to="/episodes" name="Episodes" />
        </Menu>
      </Segment>
    );
  }
}
