import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AppContext } from "context/AppContext";
import Button from "components/Button/Button";
import fbService from "api/fbService";
import { actionTypes } from "context/actionTypes";

import "./Profile.scss";

const Profile = () => {
  const history = useHistory();
  const context = useContext(AppContext);

  const logoutHandler = async () => {
    await fbService.logout();
    localStorage.removeItem("user");
    context.dispatch({ type: actionTypes.REMOVE_USER });
    history.push("/auth");
  };

  return (
    <div className="profile">
      <div className="profile__name">
        Hello, I am {context.state.user && context.state.user.displayName}
      </div>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default Profile;
