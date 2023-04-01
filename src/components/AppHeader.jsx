/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import Container from "react-bootstrap/Container";
import { Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";

import AppSyncer from "./AppSyncer";
import AppPreferencesButton from "./AppPreferencesButton";
import AppLogoutButton from "./AppLogoutButton";

import "./AppHeader.scss";

const AppHeader = ({ className }) => {
  return (
    <div className="container-fluid p-0" id="outer">
      <header>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className={`px-3 m-0 bg-dark bg-gradient ${className}`}
        >
          <Navbar.Brand>Aimo-Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <AppSyncer />
              <AppPreferencesButton />
              <AppLogoutButton />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </div>
  );
};

export default AppHeader;
