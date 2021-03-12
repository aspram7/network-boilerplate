import React, { Component } from "react";
// import { ToastContainer } from "react-toastify";
import AppRoutes from "routes/AppRoutes";

import AppContextProvider from "context/AppContextProvider";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppContextProvider>
          <AppRoutes />
        </AppContextProvider>
        {/* <ToastContainer position="bottom-right" className="app-toast-container" /> */}
      </div>
    );
  }
}

export default App;
