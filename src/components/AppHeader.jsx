/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import AppSearchBar from "./common/AppSearchBar";

import "./AppHeader.scss";
import AppPreferencesButton from "./AppPreferencesButton";

const Header = ({ className }) => {
  return (
    <Navbar className={`header ${className}`} expand="lg">
      <Container className="headerContainer">
        <AppPreferencesButton />
        <AppSearchBar />
      </Container>
    </Navbar>
  );
};

export default Header;
