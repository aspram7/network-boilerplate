import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./Button.scss";

const Button = ({ className, disabled, children, onClick }) => {
  return (
    <button
      className={cx("app-button", className, disabled && "disabled")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: "",
  disabled: false,
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
