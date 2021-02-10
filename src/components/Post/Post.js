import React from "react";

import "./Post.scss";

function Post({ title, body, className }) {
  return (
    <div className={`post-component ${className}`}>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

export default Post;
