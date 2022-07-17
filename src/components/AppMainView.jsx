/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import AppHeader from "./AppHeader";
import AppTaskList from "./AppTaskList";

import "./AppMainView.scss";

const AppMainView = () => {
  return (
    <React.Fragment>
      <AppHeader className="mainHeader" />
      <AppTaskList className="mainTaskList" />
    </React.Fragment>
  );
};

export default AppMainView;
