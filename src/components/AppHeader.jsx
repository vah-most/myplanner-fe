/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import AppSyncer from "./AppSyncer";
import AppSearchBar from "./common/AppSearchBar";
import AppPreferencesButton from "./AppPreferencesButton";
import AppLogoutButton from "./AppLogoutButton";

import "./AppHeader.scss";

const AppHeader = ({ className }) => {
  return (
    <Navbar className={`header ${className}`} expand="lg">
      <Container className="headerContainer">
        <AppLogoutButton />
        <AppPreferencesButton />
        <AppSyncer />
        <AppSearchBar />
      </Container>
    </Navbar>
  );
};

export default AppHeader;
