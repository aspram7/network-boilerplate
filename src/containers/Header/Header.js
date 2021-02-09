import React from "react";

import Layout from "components/Layout/Layout";

import "./Header.scss";

import logo from "assets/logo/logo.png";

const Header = () => {
  return (
    <header className="app-header">
      <Layout>
        <div className="app-header__container">
          <img src={logo} alt="logo" />
          <nav>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Photos</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </Layout>
    </header>
  );
};

export default Header;
