import React, { Component } from "react";

import fbService from "api/fbService";
import Post from "components/Post/Post";
import Button from "components/Button/Button";
import PostModal from "components/PostModal/PostModal";
import { AppContext } from "context/AppContext";
import { actionTypes } from "context/actionTypes";

import "./Posts.scss";

const limit = 8;
let startAt = 0;
export class Posts extends Component {
  state = {
    hasMore: true,
    loading: false,
    isOpen: false,
    titleValue: "",
    bodyValue: "",
  };

  static contextType = AppContext;

  componentDidMount() {
    if (!this.context.state.posts) {
      this.setState({
        loading: true,
      });
      fbService.fbServicePost
        .getPosts(startAt, limit)
        .then((data) => {
          this.context.dispatch({ type: actionTypes.SET_POSTS, payload: { posts: data } });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    }
  }

  updateItem = () => {
    fbService.fbServicePost.updatePost(1, { title: "Another Title" }).then((item) => {
      const newItem = this.state.posts.map((el) => {
        if (el.id === item.id) {
          return item;
        } else {
          return el;
        }
      });
      this.setState({
        posts: newItem,
      });
    });
  };

  deletePost = (id) => {
    fbService.fbServicePost.deletePost(id).then(() => {
      this.context.dispatch({ type: actionTypes.REMOVE_POST, payload: { id } });
    });
  };

  getMore = () => {
    this.setState({ loading: true }, () => {
      startAt = this.context.state.posts.length;
      fbService.fbServicePost
        .getPosts(startAt, startAt + limit)
        .then((data) => {
          this.context.dispatch({ type: actionTypes.GET_MORE_POSTS, payload: { posts: data } });
          this.setState({
            hasMore: data.length > limit,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  };

  createPost = () => {
    const { titleValue, bodyValue } = this.state;
    if (titleValue && bodyValue) {
      fbService.fbServicePost
        .createPost({
          title: titleValue,
          body: bodyValue,
        })
        .then((data) => {
          this.handleClose();
          this.props.history.push(`/posts/${data.id}`);
        });
    } else {
      alert("Fields are empty!");
    }
  };

  changeValue = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
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
      titleValue: "",
      bodyValue: "",
    });
  };

  render() {
    const {
      state: { posts },
    } = this.context;

    if (!posts) {
      return <div>Loading...</div>;
    }
    return (
      <div className="app-posts">
        {posts.length === 0 && this.state.loading && <h4>Loading...</h4>}
        {posts.length === 0 && !this.state.loading && <h4>Data not found</h4>}
        <div className="app-posts__post-container">
          {posts.map((post) => {
            return (
              <Post
                className="app-posts__post"
                key={post.id}
                post={post}
                isLink
                onRemove={() => this.deletePost(post.id)}
              />
            );
          })}
        </div>
        <Button onClick={this.handleOpen} className="app-posts__create-button">
          Create Post
        </Button>
        <PostModal
          isOpen={this.state.isOpen}
          handleClose={this.handleClose}
          action={this.createPost}
          titleValue={this.state.titleValue}
          bodyValue={this.state.bodyValue}
          changeValue={this.changeValue}
          buttonTitle="Create"
        />

        {this.state.hasMore && (
          <Button onClick={this.getMore} disabled={this.state.loading}>
            {this.state.loading ? "Loading..." : "Get more"}
          </Button>
        )}
      </div>
    );
  }
}

export default Posts;
