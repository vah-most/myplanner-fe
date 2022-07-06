/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import { Provider } from "react-redux";

import { store } from "../Store";
import AppHeader from "./AppHeader";
import AppTaskList from "./AppTaskList";

import "./AppMainView.scss";

const AppMainView = () => {
  return (
    <Provider store={store}>
      <AppHeader className="mainHeader" />
      <AppTaskList className="mainTaskList" />
    </Provider>
  );
};

export default AppMainView;
