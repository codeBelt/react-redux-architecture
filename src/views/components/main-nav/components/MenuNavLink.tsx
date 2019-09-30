import { NavLink, NavLinkProps } from 'react-router-dom';
import React from 'react';

const MenuNavLink = (props: NavLinkProps) => {
  return <NavLink exact={true} {...props} activeClassName="active" />;
};

export default MenuNavLink;
