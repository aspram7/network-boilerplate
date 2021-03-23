import React, { Component } from "react";
import fbService from "api/fbService";
import Post from "components/Post/Post";
import PostModal from "components/PostModal/PostModal";
import { AppContext } from "context/AppContext";
import { actionTypes } from "context/actionTypes";

import "./PostDetails.scss";

export class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      isOpen: false,
      titleValue: "",
      bodyValue: "",
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    fbService.fbServicePost
      .getPost(this.props.match.params.postId)
      .then((data) => {
        this.setState({
          post: data,
          titleValue: data.title,
          bodyValue: data.body,
        });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/");
      });
  }

  savePost = () => {
    fbService.fbServicePost
      .updatePost({
        ...this.state.post,
        title: this.state.titleValue,
        body: this.state.bodyValue,
      })
      .then((res) => {
        const updatedPost = {
          ...this.state.post,
          ...res,
        };
        this.setState({
          post: updatedPost,
          isOpen: false,
        });
        const {
          state: { posts },
        } = this.context;
        if (posts && posts.find((el) => el.id === this.state.post.id)) {
          this.context.dispatch({ type: actionTypes.UPDATE_POST, payload: { post: updatedPost } });
        }
      });
  };

  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  changeValue = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="app-post-details">
        <Post post={this.state.post} onEdit={this.handleOpen} />
        <PostModal
          isOpen={this.state.isOpen}
          handleClose={this.handleClose}
          action={this.savePost}
          titleValue={this.state.titleValue}
          bodyValue={this.state.bodyValue}
          changeValue={this.changeValue}
          buttonTitle="Save"
        />
      </div>
    );
  }
}

export default PostDetails;
