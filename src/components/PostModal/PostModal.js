import React, { useRef } from "react";

import { PropTypes } from "prop-types";

import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";

import "./PostModal.scss";

const PostModal = ({
  isOpen,
  handleClose,
  titleValue,
  bodyValue,
  buttonTitle,
  changeValue,
  action,
}) => {
  const inputRef = useRef();

  const refHandler = () => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <Modal open={isOpen} onClose={handleClose} className="post-modal" onRendered={refHandler}>
      <div className="post-modal__inner">
        <input
          className="post-modal__inner__input"
          name="titleValue"
          type="text"
          value={titleValue}
          onChange={changeValue}
          ref={inputRef}
        />
        <input
          className="post-modal__inner__input"
          name="bodyValue"
          type="text"
          value={bodyValue}
          onChange={changeValue}
        />
        <Button variant="contained" color="primary" onClick={action}>
          {buttonTitle}
        </Button>
      </div>
    </Modal>
  );
};

PostModal.defaultProps = {
  isOpen: false,
  handleClose: true,
  titleValue: "",
  bodyValue: "",
};

PostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  titleValue: PropTypes.string,
  bodyValue: PropTypes.string,
  buttonTitle: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  action: PropTypes.func,
};

export default PostModal;
