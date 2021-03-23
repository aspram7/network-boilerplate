import React from "react";
import PropTypes from "prop-types";
import "./Input.scss";

function Input({ className, type, name, placeholder, value, loading, onChange }) {
  return (
    <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <input
        className={`component-input ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={loading}
      />
    </form>
  );
}

Input.defaultProps = {
  className: "",
  type: "text",
  name: "",
  placeholder: "",
  value: "",
  loading: false,
  onChange: () => {},
};

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Input;
