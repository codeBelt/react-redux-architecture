import { NavLink } from 'react-router-dom';
import React from 'react';

export default function MenuNavLink(props) {
  return <NavLink exact={true} {...props} activeClassName="active" />;
}
