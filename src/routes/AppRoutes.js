import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "components/Layout/Layout";
import Header from "containers/Header/Header";
import Footer from "containers/Footer/Footer";

import Home from "containers/Sections/Home/Home";
import About from "containers/Sections/About/About";
import Todos from "containers/Sections/Todos/Todos";
import Posts from "containers/Sections/Posts/Posts";
import Contact from "containers/Sections/Contact/Contact";
import Profile from "containers/Sections/Profile/Profile";
import Auth from "containers/Auth/Auth";
import PostDetails from "containers/PostDetails/PostDetails";
import Images from "containers/Sections/Images/Images";

import "./AppRoutes.scss";

function AppRoutes() {
  return (
    <div className="app-approutes">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Layout>
            <Route exact path="/about" component={About} />
            <Route exact path="/todos" component={Todos} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/:postId" component={PostDetails} />
            <Route exact path="/images" component={Images} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/profile" component={Profile} />
          </Layout>
          <Route exact path="*">
            <h1 className="app-approutes__handle-errors">404 fage not found!</h1>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default AppRoutes;
