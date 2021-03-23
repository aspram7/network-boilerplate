import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import ImageCard from "components/ImageCard/ImageCard";
import { setReduxImages } from "store/image/action";

import "./Images.scss";

class Images extends Component {
  state = {
    loading: false,
    modalShow: false,
    activeItem: {},
  };

  componentDidMount() {
    if (!this.props.images) {
      this.setState({
        loading: true,
      });
      this.props.setReduxImages();
      this.setState({
        loading: false,
      });
    }
  }

  viewItem = (item) => {
    this.setState({
      modalShow: true,
      activeItem: item,
      loading: true,
    });
  };

  handleClose = () => {
    this.setState({
      modalShow: false,
    });
  };

  render() {
    if (!this.props.images) {
      return <div>Loading...</div>;
    }
    return (
      <div className="app-image">
        {this.props.images.map((item) => {
          return (
            <ImageCard
              className="app-image__image-card"
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
            <div className="app-image__image-card-modal">
              {this.state.loading && (
                <div className="spinner">
                  <CircularProgress />
                </div>
              )}
              <img
                src={this.state.activeItem.url}
                alt={this.state.activeItem.title}
                onLoad={() => this.setState({ loading: false })}
                onError={() => {
                  this.setState({ loading: false });
                }}
              />

              <h5>{this.state.activeItem.title}</h5>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.image.images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setReduxImages }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Images);
