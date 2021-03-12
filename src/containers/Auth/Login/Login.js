import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import fbService from "api/fbService";
import { AppContext } from "context/AppContext";
import { actionTypes } from "context/actionTypes";

import "./Login.scss";

function Login(props) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const history = useHistory();
  const context = useContext(AppContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    setCheck(!check);
  };

  const changeHandler = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const otherView = () => {
    props.otherView();
  };

  const handleLogin = () => {
    fbService.login(credentials).then((user) => {
      console.log(user);
      context.dispatch({ type: actionTypes.SET_USER, payload: { user } });
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/profile");
    });
  };

  return (
    <div className="app-auth-login">
      <div className="app-auth-login__form">
        <div className="app-auth-login__form__top">Login</div>
        <div className="app-auth-login__form__bottom">
          <div className="app-auth-login__form__bottom__input">
            <p>email</p>
            <Input
              type="text"
              name="email"
              placeholder="Enter Your Email..."
              value={credentials.email}
              onChange={(e) => changeHandler("email", e.target.value)}
            />
          </div>
          <div className="app-auth-login__form__bottom__input">
            <p>password</p>
            <Input
              type="password"
              name="password"
              placeholder="Enter Your Password..."
              value={credentials.password}
              onChange={(e) => changeHandler("password", e.target.value)}
            />
          </div>
          <Checkbox
            className="app-auth-login__form__bottom__checkbox"
            checked={check}
            onChange={handleCheck}
          >
            Remember Me
          </Checkbox>
          <Button className="app-auth-login__form__bottom__button" onClick={handleLogin}>
            Login
          </Button>
          <div className="app-auth-login__form__bottom__signup" onClick={otherView}>
            Signup
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
