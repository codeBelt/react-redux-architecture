import { NavLink, NavLinkProps } from 'react-router-dom';
import React from 'react';

export default function MenuNavLink(props: React.PropsWithChildren<NavLinkProps>): React.FunctionComponentElement<NavLinkProps> {
  return <NavLink exact={true} {...props} activeClassName="active" />;
}
