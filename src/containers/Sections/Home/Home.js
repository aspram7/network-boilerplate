import React, { Component } from "react";
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
  }

  render() {
    return <div>Home Page </div>;
  }
}

export default Home;
