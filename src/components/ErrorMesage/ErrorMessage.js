import React from "react";
import PropTypes from "prop-types";

import "./ErrorMessage.scss";

const ErrorMessage = ({ text }) => {
  return <div className="app-error-message">{text}</div>;
};

ErrorMessage.defaultProps = {
  text: "",
};
ErrorMessage.propTypes = {
  text: PropTypes.string,
};
export default ErrorMessage;
