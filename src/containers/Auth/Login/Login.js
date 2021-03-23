import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import ErrorMessage from "components/ErrorMesage/ErrorMessage";
import fbService from "api/fbService";
import { AppContext } from "context/AppContext";
import { actionTypes } from "context/actionTypes";
import validation from "utils/validation";

import "./Login.scss";

const initialState = {
  email: "",
  password: "",
};

function Login(props) {
  const history = useHistory();
  const context = useContext(AppContext);
  const [credentials, setCredentials] = useState(initialState);
  const [errorState, setErrorState] = useState(initialState);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setCheck(!check);
  };

  const changeHandler = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const otherView = () => {
    props.otherView();
  };

  const handleLogin = () => {
    const { email, password } = credentials;
    if (validation("email", email) && validation("password", password)) {
      try {
        setLoading(true);
        fbService.fbServiceAuth.login(credentials).then((user) => {
          context.dispatch({ type: actionTypes.SET_USER, payload: { user } });
          localStorage.setItem("user", JSON.stringify(user));
          setLoading(false);
          history.push("/profile");
        });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      let errors = {};

      if (!validation("email", email)) {
        errors["email"] = "*email is not valid!";
      }
      if (!validation("password", password)) {
        errors["password"] = "*password must be min 6 and max 10 letters!";
      }

      setErrorState({ ...errors });
    }
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
              onChange={changeHandler}
            />
            <ErrorMessage text={errorState.email} />
          </div>
          <div className="app-auth-login__form__bottom__input">
            <p>password</p>
            <Input
              type="password"
              name="password"
              placeholder="Enter Your Password..."
              value={credentials.password}
              onChange={changeHandler}
            />
            <ErrorMessage text={errorState.password} />
          </div>
          <Checkbox
            className="app-auth-login__form__bottom__checkbox"
            checked={check}
            onChange={handleCheck}
          >
            Remember Me
          </Checkbox>
          <Button
            className="app-auth-login__form__bottom__button"
            onClick={handleLogin}
            disabled={loading}
          >
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
