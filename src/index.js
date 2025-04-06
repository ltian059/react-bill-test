import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Inject router
import { RouterProvider } from "react-router-dom";
import router from "./router";
//注入redux store
import { Provider } from "react-redux";
import store from "./store";
import "./flexible.js"; //引入flexible.js
//导入定制主题文件
import "./theme.scss";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <div className="app">
      <RouterProvider router={router}></RouterProvider>
    </div>
  </Provider>
);
