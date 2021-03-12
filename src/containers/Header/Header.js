import React, { useContext } from "react";

import { withRouter } from "react-router-dom";

import NavLink from "components/NavLink/NavLink";

import "./Header.scss";

import logo from "assets/logo/logo.png";
import { AppContext } from "context/AppContext";

const headerLink = [
  { to: "/", title: "Home" },
  { to: "/about", title: "About" },
  { to: "/todo", title: "Todo" },
  { to: "/posts", title: "Posts" },
  { to: "/contact", title: "Contact" },
];

const Header = () => {
  // componentDidUpdate(prevState) {
  //   if (prevState.location.pathname !== this.props.location.pathname) {
  //     if (this.props.location.pathname === "/posts") {
  //       document.body.classList.add("body-color");
  //     } else {
  //       document.body.classList.remove("body-color");
  //     }
  //   }
  // }

  const context = useContext(AppContext);

  return (
    <header className="app-header">
      <div className="app-header__container">
        <img src={logo} alt="logo" />
        <nav>
          <ul>
            {headerLink.map((el) => {
              return (
                <li key={el.title}>
                  <NavLink to={el.to}>{el.title}</NavLink>
                </li>
              );
            })}
            {!context.state.user ? (
              <li key="auth">
                <NavLink to="/auth">Auth</NavLink>
              </li>
            ) : (
              <li key="profile">
                <NavLink to="/profile">Profile</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default withRouter(Header);
