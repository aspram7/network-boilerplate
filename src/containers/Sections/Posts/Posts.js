import React, { Component } from "react";

import { getAllPosts, updatePosts } from "api/requestData";

// import service from "api/service";
import fbService from "api/fbService";
import Post from "components/Post/Post";
import Button from "components/Button/Button";
import { AppContext } from "context/AppContext";
import { actionTypes } from "context/actionTypes";
import PostModal from "components/PostModal/PostModal";

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
      fbService
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
    fbService.updatePost(1, { title: "Another Title" }).then((item) => {
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
    fbService.deletePost(id).then(() => {
      this.setState({
        posts: this.state.posts.filter((el) => {
          return el.id !== id;
        }),
      });
    });
  };

  getMore = () => {
    this.setState({ loading: true }, () => {
      startAt = this.context.state.posts.length;
      fbService
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
      fbService
        .createPost({
          title: titleValue,
          body: bodyValue,
        })
        .then((data) => {
          console.log(data);
          // this.setState(
          //   {
          //     posts: [...this.state.posts, data],
          //   },
          //   () => {
          //     this.handleClose();
          //   }
          // );
          this.context.dispatch({
            type: actionTypes.CREATE_POST,
            payload: {
              post: data,
            },
          });
          this.handleClose();
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
        {/* <div className="app-posts__post-container">
          {this.state.posts.map((post) => {
            return <Post className="app-posts__post" key={post.id} post={post} isLink />;
          })}
        </div> */}
      </div>
    );
  }
}

export default Posts;
