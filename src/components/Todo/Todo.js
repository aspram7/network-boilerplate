import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "context/AppContext";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckBox from "components/Checkbox/Checkbox";

import "./Todo.scss";

const Todo = ({ className, title, checked, onChangeCheckBox, onEdit, onRemove }) => {
  const context = useContext(AppContext);
  const _removeHandler = (e) => {
    e.preventDefault();
    onRemove();
  };
  return (
    <div className={`todo-component ${className}`}>
      <div className="todo-component__left-side">
        {context.state.user && (
          <CheckBox
            className="todo-component__left-side__checkbox"
            checked={checked}
            onChange={onChangeCheckBox}
          />
        )}
        <p>{title}</p>
      </div>
      <div className="todo-component__right-side">
        {context.state.user && (
          <>
            <EditIcon
              color="primary"
              fontSize="small"
              className="todo-component__right-side__edit"
              onClick={onEdit}
            />
            <DeleteIcon
              color="primary"
              onClick={_removeHandler}
              fontSize="small"
              className="todo-component__right-side__remove-button"
            >
              Remove
            </DeleteIcon>
          </>
        )}
      </div>
    </div>
  );
};

Todo.defaultProps = {
  className: "",
  title: "",
  checked: false,
  onChangeCheckBox: () => {},
  onEdit: () => {},
  onRemove: () => {},
};

Todo.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  checked: PropTypes.bool,
  onChangeCheckBox: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Todo;
