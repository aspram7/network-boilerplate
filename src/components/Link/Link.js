import React from "react";

import { Link as RouterLink } from "react-router-dom";

import "./Link.scss";

function Link({ children, to, className }) {
  return (
    <RouterLink className={`app-link ${className}`} to={to}>
      {children}
    </RouterLink>
  );
}

export default Link;
