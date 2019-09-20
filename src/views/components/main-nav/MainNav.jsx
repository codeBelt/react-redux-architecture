import * as React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import MenuNavLink from './components/MenuNavLink';

export default class MainNav extends React.PureComponent {
  render() {
    return (
      <Segment inverted={true}>
        <Menu inverted={true} pointing={true} secondary={true}>
          <Menu.Item as={MenuNavLink} to="/" name="home" />
          <Menu.Item as={MenuNavLink} to="/episodes" name="Episodes" />
        </Menu>
      </Segment>
    );
  }
}
