import React, { Component } from "react";
import service from "api/service";
import fbService from "api/fbService";

import Post from "components/Post/Post";
import { AppContext } from "context/AppContext";

import "./PostDetails.scss";
import { actionTypes } from "context/actionTypes";
import PostModal from "components/PostModal/PostModal";

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

  changeValue = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    // if (!this.state.post) {
    //   return <div>Loading...</div>;
    // }
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
        {/* <Modal
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
        </Modal> */}
      </div>
    );
  }
}

export default PostDetails;
