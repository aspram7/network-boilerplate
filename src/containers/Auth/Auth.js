import React, { useState } from "react";

import Login from "containers/Auth/Login/Login";
import Signup from "containers/Auth/Signup/Signup";

import "./Auth.scss";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleView = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="app-auth">
      {isLogin ? <Login otherView={toggleView} /> : <Signup otherView={toggleView} />}
    </div>
  );
}

export default Auth;
