/*
 * Created on Sat Jul 09 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import NavDropdown from "react-bootstrap/NavDropdown";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { preferencesChange } from "reducers/PreferencesReducer";
import AimoTooltip from "@aimo.ui/aimo-tooltip";

import "./AppPreferencesButton.scss";
import React from "react";
import { Check2, Gear } from "react-bootstrap-icons";

const AppPreferencesButton = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.preferences.value);

  const handlePrefChange = (key, value) => {
    let newPrefs = { ...preferences };
    newPrefs[key] = value;
    dispatch(preferencesChange(newPrefs));
  };

  return (
    <React.Fragment>
      <Dropdown className="prefButtonContainer" id="menu_preferences">
        <Dropdown.Toggle
          variant="link"
          bsPrefix="p-0"
          className="prefButtonToggle"
        >
          <Gear className="prefButton" />
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
      <AimoTooltip target="menu_preferences">Preferences</AimoTooltip>
    </React.Fragment>
  );
};

export default AppPreferencesButton;
