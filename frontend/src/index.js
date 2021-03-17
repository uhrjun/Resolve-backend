import React from "react";
import "./Global.css";
import reportWebVitals from "./reportWebVitals";
import Modal from "react-modal";

import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";

//Components
import App from "./App";
import UserForm from "./components/UserForm/UserForm";
import ProtectedRoute from "./utils/Protected.routes";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/userauth" component={UserForm} />
        <ProtectedRoute path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
