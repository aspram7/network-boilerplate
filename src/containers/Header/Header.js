import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import NavLink from "components/NavLink/NavLink";
import { AppContext } from "context/AppContext";
import logo from "assets/logo/logo.png";

import "./Header.scss";

const headerLink = [
  { to: "/", title: "Home" },
  { to: "/about", title: "About" },
  { to: "/todos", title: "Todos" },
  { to: "/posts", title: "Posts" },
  { to: "/images", title: "Images" },
  { to: "/contact", title: "Contact" },
];

const Header = () => {
  const context = useContext(AppContext);

  return (
    <header className="app-header">
      <div className="app-header__container">
        <NavLink to={"/"}>
          <img src={logo} alt="logo" />
        </NavLink>

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
