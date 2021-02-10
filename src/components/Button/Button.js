import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";

const Button = ({ onClick, children }) => {
  return (
    <button className="app-button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
