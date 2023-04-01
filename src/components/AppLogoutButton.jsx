/*
 * Created on Fri Jul 22 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import authService from "services/AuthService";

import AimoTooltip from "@aimo.ui/aimo-tooltip";

import "./AppLogoutButton.scss";
import { BoxArrowRight } from "react-bootstrap-icons";
import { Nav } from "react-bootstrap";

const AppLogoutButton = () => {
  const doLogout = () => {
    authService.logout();
    window.location = "/";
  };

  return (
    <React.Fragment>
      <Nav.Link>
        <BoxArrowRight className="signoutButton" onClick={doLogout} />
      </Nav.Link>
    </React.Fragment>
  );
};

export default AppLogoutButton;
