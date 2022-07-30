/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import AppTaskList from "./AppTaskList";
import AppFooter from "components/AppFooter";

import "./AppMainView.scss";

const AppMainView = () => {
  return (
    <React.Fragment>
      <AppTaskList className="mainTaskList" />
      <AppFooter />
    </React.Fragment>
  );
};

export default AppMainView;
