import React from "react";
import PropTypes from "prop-types";
import "./Checkbox.scss";

function Checkbox({ className, checked, children, onChange }) {
  return (
    <div className={`component-checkbox ${className}`}>
      <input type="checkbox" id="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor="checkbox">{children}</label>
    </div>
  );
}

Checkbox.defaultProps = {
  className: "",
  checked: false,
  onChange: () => {},
};

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
