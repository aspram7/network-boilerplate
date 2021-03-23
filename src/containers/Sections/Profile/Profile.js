import React, { useContext } from "react";
import { useHistory } from "react-router";

import fbService from "api/fbService";
import Button from "components/Button/Button";
import ImageInput from "components/ImageInput/ImageInput";
import { AppContext } from "context/AppContext";
import { actionTypes } from "context/actionTypes";

import "./Profile.scss";

const Profile = () => {
  const history = useHistory();
  const context = useContext(AppContext);

  const logoutHandler = async () => {
    await fbService.fbServiceAuth.logout();
    localStorage.removeItem("user");
    context.dispatch({ type: actionTypes.REMOVE_USER });
    history.push("/auth");
  };

  const loginHandler = async () => {
    history.push("/auth");
  };

  return (
    <div className="app-profile">
      <div className="app-profile__name">
        {context.state.user ? (
          <div className="app-profile__name__input">
            <ImageInput userImage={context.state.user.photoURL} />
          </div>
        ) : null}
        Welcome{" "}
        <span>{context.state.user ? context.state.user.displayName : "to Our Website"}</span>
      </div>
      {context.state.user ? (
        <Button onClick={logoutHandler} className="app-profile__button">
          Logout
        </Button>
      ) : (
        <Button onClick={loginHandler} className="app-profile__button">
          Login
        </Button>
      )}
    </div>
  );
};

export default Profile;
