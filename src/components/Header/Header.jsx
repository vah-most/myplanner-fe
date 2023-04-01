/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { Nav, Navbar } from "react-bootstrap";

import HeaderSyncer from "./HeaderSyncer";
import HeaderPreferences from "./HeaderPreferences";
import HeaderLogout from "./HeaderLogout";

import "./Header.scss";
import HeaderLogo from "./HeaderLogo";

const Header = ({ className }) => {
  return (
    <div className="container-fluid p-0" id="outer">
      <header>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className={`px-3 m-0 bg-dark bg-gradient ${className}`}
        >
          <Navbar.Brand>
            <HeaderLogo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <HeaderSyncer />
              <HeaderPreferences />
              <HeaderLogout />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
