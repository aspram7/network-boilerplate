import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouterNavLink } from "react-router-dom";
import "./NavLink.scss";

function NavLink({ className, to, children }) {
  return (
    <RouterNavLink
      exact
      activeClassName="app-nav-link--active"
      className={`app-nav-link ${className}`}
      to={to}
    >
      {children}
    </RouterNavLink>
  );
}

NavLink.defaultProps = {
  className: "",
  to: "/",
};

NavLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavLink;
