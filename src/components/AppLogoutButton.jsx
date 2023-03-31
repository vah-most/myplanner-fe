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

const AppLogoutButton = () => {
  const doLogout = () => {
    authService.logout();
    window.location = "/";
  };

  return (
    <React.Fragment>
      <BoxArrowRight className="signoutButton" onClick={doLogout} />
      <AimoTooltip target="menu_logout">Logout from account</AimoTooltip>
    </React.Fragment>
  );
};

export default AppLogoutButton;
