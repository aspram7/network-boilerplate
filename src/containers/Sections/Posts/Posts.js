import React, { Component } from "react";

import { getAllPosts, updatePosts } from "api/requestData";
import service from "api/service";
import Post from "components/Post/Post";
import Button from "components/Button/Button";

import "./Posts.scss";

const limit = 9;
let start = 0;

export class Posts extends Component {
  state = {
    posts: [],
    hasMore: true,
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    service
      .getPosts(0, 9)
      .then((data) => {
        this.setState({
          posts: data,
        });
      })
      .catch((err) => {
        console.log("Error");
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  updateItem = () => {
    service.updatePost(1, { title: "Another Title" }).then((item) => {
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

  getMore = () => {
    this.setState({ loading: true }, () => {
      start = this.state.posts.length;
      service
        .getPosts(start, limit)
        .then((data) => {
          this.setState({
            posts: [...this.state.posts, ...data],
            hasMore: data.length === limit,
          });
        })
        .catch((err) => {
          console.log("Error");
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  };
  render() {
    return (
      <div className="app-posts">
        {this.state.posts.length === 0 && this.state.loading && <h4>Loading...</h4>}
        {this.state.posts.length === 0 && !this.state.loading && <h4>Data not found</h4>}
        <div className="app-posts__post-container">
          {this.state.posts.map((post) => {
            return <Post className="app-posts__post" key={post.id} post={post} />;
          })}
        </div>
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
