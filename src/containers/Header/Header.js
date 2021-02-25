import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import Layout from "components/Layout/Layout";
import NavLink from "components/NavLink/NavLink";

import "./Header.scss";

import logo from "assets/logo/logo.png";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevState) {
    if (prevState.location.pathname !== this.props.location.pathname) {
      if (this.props.location.pathname === "/posts") {
        document.body.classList.add("body-color");
      } else {
        document.body.classList.remove("body-color");
      }
    }
  }

  render() {
    return (
      <header className="app-header">
        <div className="app-header__container">
          <img src={logo} alt="logo" />
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/posts">Posts</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
