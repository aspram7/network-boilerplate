import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

import "./Link.scss";

function Link({ className, to, children }) {
  return (
    <RouterLink className={`app-link ${className}`} to={to}>
      {children}
    </RouterLink>
  );
}

Link.defaultProps = {
  className: "",
  to: "/",
};

Link.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
