/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import { Nav } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";

import authService from "services/AuthService";

import "./HeaderLogout.scss";

const HeaderLogout = () => {
  const doLogout = () => {
    authService.logout();
    window.location = "/";
  };

  return (
    <React.Fragment>
      <Nav.Link>
        <BoxArrowRight className="signoutButton" onClick={doLogout} />
        <span className="headerItemText">SignOut</span>
      </Nav.Link>
    </React.Fragment>
  );
};

export default HeaderLogout;
