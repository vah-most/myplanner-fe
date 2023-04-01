/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import TaskListPage from "../TaskListPage";
import Footer from "../../components/Footer";

import "./Page.scss";

const Page = () => {
  return (
    <React.Fragment>
      <TaskListPage className="pageContent" />
      <Footer />
    </React.Fragment>
  );
};

export default Page;
