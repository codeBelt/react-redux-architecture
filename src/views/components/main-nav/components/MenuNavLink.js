import { NavLink } from 'react-router-dom';
import React from 'react';

const MenuNavLink = (props) => {
  return <NavLink exact={true} {...props} activeClassName="active" />;
};

export default MenuNavLink;
