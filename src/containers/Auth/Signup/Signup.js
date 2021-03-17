import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import fbService from "api/fbService";
import ErrorMessage from "components/ErrorMesage/ErrorMessage";
import validation from "utils/validation";
// import errorMap from "utils/errorMap";
import { AppContext } from "context/AppContext";
import { actionTypes } from "context/actionTypes";

import "./Signup.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup(props) {
  const history = useHistory();
  const context = useContext(AppContext);
  const [credentials, setCredentials] = useState(initialState);
  const [errorState, setErrorState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const otherView = () => {
    props.otherView();
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = credentials;

    if (
      validation("name", name) &&
      validation("email", email) &&
      validation("password", password) &&
      password === confirmPassword
    ) {
      try {
        setLoading(true);
        const user = await fbService.signup(credentials);
        console.log("success: ", user);
        context.dispatch({ type: actionTypes.SET_USER, payload: { user } });
        localStorage.setItem("user", JSON.stringify(user));
        history.push("/profile");
      } catch (err) {
        // toast.error(`Signup failed: ${err}`);
        console.log(err);
        if (err.code === "auth/invalid-email") {
          setErrorState({
            mailError: "*" + err.message,
          });
        } else {
          setErrorState({
            passwordError: "*" + err.message,
          });
        }
      } finally {
        setLoading(false);
      }
    } else {
      let errors = {};
      switch (false) {
        case validation("name", name):
          errors["name"] = "*name is not valid!";
        /* falls through */
        case validation("email", email):
          errors["email"] = "*email is not valid!";
        /* falls through */
        case validation("password", password):
          errors["password"] = "*password must be min 6 and max 10 letters!";
        /* falls through */
        case password === confirmPassword:
          errors["confirmPassword"] = "*passwords are not match!";
        /* falls through */
        default:
          errors = { ...initialState, ...errors };
      }

      setErrorState({ ...errors });
    }
  };

  return (
    <div className="app-auth-signup">
      <div className="app-auth-signup__form">
        <div className="app-auth-signup__form__top">Signup</div>
        <div className="app-auth-signup__form__bottom">
          <div className="app-auth-signup__form__bottom__input">
            <p>name</p>
            <Input
              type="text"
              name="name"
              placeholder="Enter Your Name..."
              value={credentials.name}
              onChange={changeHandler}
              loading={loading}
            />
            <ErrorMessage text={errorState.name} />
          </div>
          <div className="app-auth-signup__form__bottom__input">
            <p>email</p>
            <Input
              type="text"
              name="email"
              placeholder="Enter Your Email..."
              value={credentials.email}
              onChange={changeHandler}
              loading={loading}
            />
            <ErrorMessage text={errorState.email} />
          </div>
          <div className="app-auth-signup__form__bottom__input">
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
          <div className="app-auth-signup__form__bottom__input">
            <p>confirm password</p>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Your Password..."
              value={credentials.confirmPassword}
              onChange={changeHandler}
            />
            <ErrorMessage text={errorState.confirmPassword} />
          </div>
          <Button
            className="app-auth-signup__form__bottom__button"
            onClick={handleSignup}
            disabled={loading}
          >
            Signup
          </Button>
          <div className="app-auth-signup__form__bottom__login" onClick={otherView}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
