import React from "react";

import Layout from "components/Layout/Layout";
import Link from "components/Link/Link";

import "./Header.scss";

import logo from "assets/logo/logo.png";

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header__fixed">
        <Layout>
          <div className="app-header__container">
            <img src={logo} alt="logo" />
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/posts">Posts</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </Layout>
      </div>
      <div className="app-header__empty-block" />
    </header>
  );
};

export default Header;
