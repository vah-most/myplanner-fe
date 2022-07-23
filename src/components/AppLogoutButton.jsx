/*
 * Created on Fri Jul 22 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import authService from "services/AuthService";

import AppIcon from "./common/AppIcon";

import "./AppLogoutButton.scss";

const AppLogoutButton = () => {
  const doLogout = () => {
    authService.logout();
    window.location = "/";
  };

  return (
    <AppIcon className="signoutButton" name="sign-out" onClick={doLogout} />
  );
};

export default AppLogoutButton;
