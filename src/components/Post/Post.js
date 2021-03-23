import React, { useContext } from "react";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

import Link from "components/Link/Link";

import "./Post.scss";
import { AppContext } from "context/AppContext";

function Post({ className, isLink, post, onEdit, onRemove }) {
  const context = useContext(AppContext);
  const _removeHandler = (e) => {
    e.preventDefault();
    onRemove();
  };
  const Wrapper = ({ children }) => {
    const postClassName = `post-component ${className}`;
    return isLink ? (
      <Link to={`/posts/${post.id}`} className={postClassName}>
        {context.state.user && (
          <Button variant="contained" color="primary" onClick={_removeHandler}>
            Remove
          </Button>
        )}

        {children}
      </Link>
    ) : (
      <div className={postClassName}>
        <Button variant="contained" color="primary" onClick={onEdit}>
          <EditIcon />
          <span className="post-component__edit">Edit</span>
        </Button>
        {children}
      </div>
    );
  };
  return (
    <Wrapper>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </Wrapper>
  );
}

Post.defaultProps = {
  className: "",
  isLink: false,
  post: {},
  onEdit: () => {},
  onRemove: () => {},
};

Post.propTypes = {
  className: PropTypes.string,
  isLink: PropTypes.bool,
  post: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
};

export default Post;
