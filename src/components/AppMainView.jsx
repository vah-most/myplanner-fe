/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import AppTaskList from "./AppTaskList";
import Footer from "./Footer";

import "./AppMainView.scss";

const AppMainView = () => {
  return (
    <React.Fragment>
      <AppTaskList className="mainTaskList" />
      <Footer />
    </React.Fragment>
  );
};

export default AppMainView;
