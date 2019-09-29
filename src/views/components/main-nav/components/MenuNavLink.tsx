import { NavLink, NavLinkProps } from 'react-router-dom';
import React from 'react';

const MenuNavLink: React.FC<NavLinkProps> = (props: React.PropsWithChildren<NavLinkProps>) => {
  return <NavLink exact={true} {...props} activeClassName="active" />;
};

export default MenuNavLink;
