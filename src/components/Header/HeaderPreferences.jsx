/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { Check2, Gear } from "react-bootstrap-icons";

import { preferencesChange } from "reducers/PreferencesReducer";

import "./HeaderPreferences.scss";

const HeaderPreferences = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.preferences.value);

  const handlePrefChange = (key, value) => {
    let newPrefs = { ...preferences };
    newPrefs[key] = value;
    dispatch(preferencesChange(newPrefs));
  };

  return (
    <React.Fragment>
      <Dropdown className="nav-link prefButtonContainer" id="menu_preferences">
        <Dropdown.Toggle
          variant="link"
          bsPrefix="p-0"
          className="nav-link prefButtonToggle"
        >
          <Gear className="prefButton" />
          <span className="headerItemText">Preferences</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu prefDropDown">
          <NavDropdown.Item
            onClick={() => {
              handlePrefChange(
                "hideCompletedTasks",
                "hideCompletedTasks" in preferences
                  ? !preferences["hideCompletedTasks"]
                  : true
              );
            }}
          >
            <div className="prefItemContainer">
              <div className="prefItemChecked">
                {"hideCompletedTasks" in preferences &&
                  preferences["hideCompletedTasks"] === true && <Check2 />}
              </div>
              <div className="prefItemText">Hide Completed Tasks</div>
            </div>
          </NavDropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

export default HeaderPreferences;
