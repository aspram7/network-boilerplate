import React, { Component } from "react";
import { Provider } from "react-redux";
// import { ToastContainer } from "react-toastify";
import AppRoutes from "routes/AppRoutes";

import AppContextProvider from "context/AppContextProvider";
import { store } from "reducers";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <AppContextProvider>
            <AppRoutes />
          </AppContextProvider>
        </Provider>
        {/* <ToastContainer position="bottom-right" className="app-toast-container" /> */}
      </div>
    );
  }
}

export default App;
