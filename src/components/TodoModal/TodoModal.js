import React, { useRef } from "react";

import { PropTypes } from "prop-types";

import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";

import "./TodoModal.scss";

const TodoModal = ({ isOpen, handleClose, titleValue, buttonTitle, changeValue, action }) => {
  const inputRef = useRef();

  const refHandler = () => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <Modal open={isOpen} onClose={handleClose} className="todo-modal" onRendered={refHandler}>
      <div className="todo-modal__inner">
        <input
          className="todo-modal__inner__input"
          name="titleValue"
          type="text"
          value={titleValue}
          onChange={changeValue}
          ref={inputRef}
        />
        <Button variant="contained" color="primary" onClick={action}>
          {buttonTitle}
        </Button>
      </div>
    </Modal>
  );
};

TodoModal.defaultProps = {
  isOpen: false,
  handleClose: true,
  titleValue: "",
};

TodoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  titleValue: PropTypes.string,
  buttonTitle: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  action: PropTypes.func,
};

export default TodoModal;
