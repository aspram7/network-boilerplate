import React, { Component } from "react";

import { getAllPosts, updatePosts } from "api/requestData";
import service from "api/service";
import Post from "components/Post/Post";
import Button from "components/Button/Button";

import "./Section.scss";

class Section extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    service
      .getAllPosts()
      .then((data) => {
        this.setState({
          posts: data,
        });
      })
      .catch((err) => {
        console.log("Error");
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

  render() {
    return (
      <div className="app-section">
        {this.state.posts.map((item) => {
          return <Post className="app-section__post" key={item.id} title={item.title} body={item.body} />;
        })}
        <Button onClick={this.updateItem}>Update Item</Button>
      </div>
    );
  }
}

export default Section;
