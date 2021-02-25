import React from "react";

import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

import Link from "components/Link/Link";

import "./Post.scss";

function Post({ post, className = "", isLink = false, edit, remove }) {
  const removeHandler = (e) => {
    e.preventDefault();
    remove();
  };
  const Wrapper = ({ children }) => {
    const postClassName = `post-component ${className}`;
    return isLink ? (
      <Link to={`/posts/${post.id}`} className={postClassName}>
        <Button variant="contained" color="primary" onClick={removeHandler}>
          Remove
        </Button>
        {children}
      </Link>
    ) : (
      <div className={postClassName}>
        <Button variant="contained" color="primary" onClick={edit}>
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

export default Post;
