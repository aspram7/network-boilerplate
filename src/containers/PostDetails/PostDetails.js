import React, { Component } from "react";
import service from "api/service";
import fbService from "api/fbService";

import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";

import Post from "components/Post/Post";

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

  componentDidMount() {
    fbService
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

  savePost = () => {
    fbService
      .updatePost({
        ...this.state.post,
        title: this.state.titleValue,
        body: this.state.bodyValue,
      })
      .then((res) => {
        this.setState({
          post: {
            ...this.state.post,
            ...res,
          },
          isOpen: false,
        });
      });
  };

  onChangeTitle = (e) => {
    this.setState({
      titleValue: e.target.value,
    });
  };
  onChangeBody = (e) => {
    this.setState({
      bodyValue: e.target.value,
    });
  };

  render() {
    // if (!this.state.post) {
    //   return <div>Loading...</div>;
    // }
    return (
      <div className="app-post-details">
        <Post post={this.state.post} edit={this.handleOpen} />
        <Modal
          open={this.state.isOpen}
          onClose={this.handleClose}
          className="app-post-details__modal"
        >
          <div className="app-post-details__modal__inner">
            <input
              className="app-post-details__modal__inner__input"
              type="text"
              value={this.state.titleValue}
              onChange={this.onChangeTitle}
            />
            <input
              className="app-post-details__modal__inner__input"
              type="text"
              value={this.state.bodyValue}
              onChange={this.onChangeBody}
            />
            <Button variant="contained" color="primary" onClick={this.savePost}>
              Save
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PostDetails;
