import React, { Component } from "react";
import service from "api/service";

import Post from "components/Post/Post";

import "./PostDetails.scss";

export class PostDetails extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log(props.match.params.postId);
    this.state = {
      post: [],
    };
  }

  componentDidMount() {
    service
      .getPost(this.props.match.params.postId)
      .then((data) => {
        this.setState({
          post: data,
        });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/");
      });
  }

  render() {
    // if (!this.state.post) {
    //   return <div>Loading...</div>;
    // }
    return (
      <div>
        <Post classNameLink="post-details__link" post={this.state.post} />
      </div>
    );
  }
}

export default PostDetails;
