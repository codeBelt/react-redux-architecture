import * as React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import MenuNavLink from './components/MenuNavLink';
import RouteEnum from '../../../constants/RouteEnum';

interface IProps {}
interface IState {}

export default class MainNav extends React.PureComponent<IProps, IState> {
  public render(): JSX.Element {
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
}
