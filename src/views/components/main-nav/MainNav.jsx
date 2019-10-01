import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import MenuNavLink from './components/MenuNavLink';
import RouteEnum from '../../../constants/RouteEnum';

export default function MainNav(props) {
  return (
    <Segment inverted={true}>
      <Menu inverted={true} pointing={true} secondary={true}>
        <Menu.Item as={MenuNavLink} to={RouteEnum.Home} name="Home" />
        <Menu.Item as={MenuNavLink} to={RouteEnum.Episodes} name="Episodes" />
        <Menu.Item as={MenuNavLink} to={RouteEnum.About} name="About" />
      </Menu>
    </Segment>
  );
}
