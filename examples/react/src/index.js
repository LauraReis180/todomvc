import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";

import { App } from "./todo/app";

import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="*" element={<App />} />
    </Routes>
  </HashRouter>,
  document.getElementById("root")
);

