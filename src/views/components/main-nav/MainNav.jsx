import * as React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => <NavLink exact={true} {...props} activeClassName="active" />;

export default class MainNav extends React.Component {
  render() {
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
