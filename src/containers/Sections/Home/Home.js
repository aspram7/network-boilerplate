import React, { Component } from "react";
import { connect } from "react-redux";
import postsMockup from "data-mockup/post-mockup";

import fbService from "api/fbService";

class Home extends Component {
  componentDidMount() {
    // fetch("https://react-learn-eb22c-default-rtdb.firebaseio.com/posts.json", {
    //   method: "PUT",
    //   body: JSON.stringify(postsMockup),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // fbService.initializePosts();
    // fbService.initializeTodos();
  }

  render() {
    return (
      <div>
        <button onClick={this.props.incrementCount}>Increment</button>
        <span>{this.props.count}</span>
        <button onClick={this.props.decrementCount}>Decrement</button>
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
  incrementCount: () => ({ type: "INCREMENT_COUNT" }),
  decrementCount: () => ({ type: "DECREMENT_COUNT" }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
