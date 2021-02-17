import React from "react";

import Link from "components/Link/Link";

import "./Post.scss";

function Post({ post, className, classNameLink }) {
  return (
    <Link to={`/posts/${post.id}`} className={classNameLink}>
      <div className={`post-component ${className}`}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </Link>
  );
}

export default Post;
