import * as React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import MenuNavLink from './components/MenuNavLink';

interface IProps {}
interface IState {}

export default class MainNav extends React.PureComponent<IProps, IState> {
  public render(): JSX.Element {
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
