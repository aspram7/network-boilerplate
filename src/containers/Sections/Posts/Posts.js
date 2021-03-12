import React, { Component } from "react";

import { getAllPosts, updatePosts } from "api/requestData";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
// import service from "api/service";
import fbService from "api/fbService";
import Post from "components/Post/Post";
import Button from "components/Button/Button";

import "./Posts.scss";

const limit = 8;
let startAt = 0;

export class Posts extends Component {
  state = {
    posts: [],
    hasMore: true,
    loading: false,
    isOpen: false,
    titleValue: "",
    bodyValue: "",
  };

  componentDidMount() {
    // this.setState({
    //   loading: true,
    // });
    // service
    //   .getPosts(0, 9)
    //   .then((data) => {
    //     this.setState({
    //       posts: data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     this.setState({
    //       loading: false,
    //     });
    //   });

    this.setState({
      loading: true,
    });
    fbService
      .getPosts(startAt, limit)
      .then((data) => {
        this.setState({
          posts: data,
        });
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
      startAt = this.state.posts.length + 1;
      fbService
        .getPosts(startAt, startAt + limit)
        .then((data) => {
          this.setState({
            posts: [...this.state.posts, ...data],
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
          title: this.state.titleValue,
          body: this.state.bodyValue,
        })
        .then((data) => {
          console.log(data);
          this.setState(
            {
              posts: [...this.state.posts, data],
            },
            () => {
              this.handleClose();
            }
          );
        });
    } else {
      alert("Fields are empty!");
    }
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
    return (
      <div className="app-posts">
        {/* {this.state.posts.length === 0 && this.state.loading && <h4>Loading...</h4>}
        {this.state.posts.length === 0 && !this.state.loading && <h4>Data not found</h4>}
        <div className="app-posts__post-container">
          {this.state.posts.map((post) => {
            return <Post className="app-posts__post" key={post.id} post={post} isLink />;
          })}
        </div>
        {this.state.hasMore && (
          <Button onClick={this.getMore} disabled={this.state.loading}>
            {this.state.loading ? "Loading..." : "Get more"}
          </Button>
        )} */}
        {this.state.posts.length === 0 && this.state.loading && <h4>Loading...</h4>}
        {this.state.posts.length === 0 && !this.state.loading && <h4>Data not found</h4>}
        <div className="app-posts__post-container">
          {this.state.posts.map((post) => {
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
            <Button variant="contained" color="primary" onClick={this.createPost}>
              Save
            </Button>
          </div>
        </Modal>
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
