import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./Button.scss";

const Button = ({ onClick, children, disabled }) => {
  return (
    <button className={cx("app-button", disabled && "disabled")} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
