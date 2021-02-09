import React, { Component } from "react";

import Modal from "@material-ui/core/Modal";

import ImageCard from "components/ImageCard/ImageCard";
// import Service from "api/service";

import "./Section.scss";

class Section extends Component {
  state = {
    posts: [],
    modalShow: false,
    activeItem: {},
  };
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((json) => {
        const data = json.filter((item) => item.albumId === 1);
        this.setState({
          posts: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  viewItem = (item) => {
    this.setState({
      modalShow: true,
      activeItem: item,
    });
    console.log(item);
  };

  handleClose = () => {
    this.setState({
      modalShow: false,
    });
  };

  render() {
    return (
      <div className="app-section">
        {this.state.posts.map((item) => {
          return (
            <ImageCard
              className="app-section__image-card"
              key={item.id}
              image={item.thumbnailUrl}
              children={item.title}
              onClick={() => this.viewItem(item)}
            />
          );
        })}
        <Modal
          open={this.state.modalShow}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="my-modal-container"
        >
          <div className="my-modal">
            <div className="app-section__image-card-modal">
              <img src={this.state.activeItem.url} alt={this.state.activeItem.title} />
              <h5>{this.state.activeItem.title}</h5>
            </div>
          </div>
        </Modal>
        {/* <Service children="Click Me" /> */}
      </div>
    );
  }
}

export default Section;
