import React, { Component } from "react";
import { connect } from "react-redux";
import fbService from "api/fbService";
import homeImage from "assets/home/home.jpg";
import { incrementCount, decrementCount } from "store/count/action";

import "./Home.scss";
class Home extends Component {
  componentDidMount() {
    fbService.fbServicePost.initializePosts();
    fbService.fbServiceTodo.initializeTodos();
    fbService.fbServiceImage.initializeImages();
  }

  render() {
    return (
      <div className="app-home">
        <img src={homeImage} alt="HomeImage" />
        <div className="app-home__buttons">
          <button onClick={this.props.incrementCount}>Increment</button>
          <span>{this.props.count}</span>
          <button onClick={this.props.decrementCount}>Decrement</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = {
  incrementCount,
  decrementCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
