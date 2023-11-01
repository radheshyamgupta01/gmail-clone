import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./Components/ReduxStore/Index";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
// Bootstrap Added React-Bootstrap :
import "bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
