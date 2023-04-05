/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import TaskListPage from "pages/TaskListPage";
import Footer from "components/Footer";
import Header from "components/Header";

import "./Page.scss";

const Page = () => {
  return (
    <React.Fragment>
      <Header className="mainHeader" />
      <TaskListPage className="pageContent" />
      <Footer />
    </React.Fragment>
  );
};

export default Page;
