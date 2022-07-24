/*
 * Created on Fri Jul 22 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import authService from "services/AuthService";

import AppIcon from "./common/AppIcon";
import AppTooltip from "./common/AppTooltip";

import "./AppLogoutButton.scss";

const AppLogoutButton = () => {
  const doLogout = () => {
    authService.logout();
    window.location = "/";
  };

  return (
    <React.Fragment>
      <AppIcon
        className="signoutButton"
        id="menu_logout"
        name="sign-out"
        onClick={doLogout}
      />
      <AppTooltip target="menu_logout">Logout from account</AppTooltip>
    </React.Fragment>
  );
};

export default AppLogoutButton;
