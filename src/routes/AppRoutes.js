import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "containers/Header/Header";
import Footer from "containers/Footer/Footer";
import Layout from "components/Layout/Layout";

import Home from "containers/Sections/Home/Home";
import About from "containers/Sections/About/About";
import Todo from "containers/Sections/Todo/Todo";
import Posts from "containers/Sections/Posts/Posts";
import Contact from "containers/Sections/Contact/Contact";
import Profile from "containers/Sections/Profile/Profile";
import Auth from "containers/Auth/Auth";
import PostDetails from "containers/PostDetails/PostDetails";

import "./AppRoutes.scss";

function AppRoutes() {
  return (
    <div className="app-approutes">
      <Router>
        <Header />
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/todo" component={Todo} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/:postId" component={PostDetails} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="*">
              <h1 className="app-approutes__handle-errors">404 fage not found!</h1>
            </Route>
          </Switch>
        </Layout>
        <Footer />
      </Router>
    </div>
  );
}

export default AppRoutes;
