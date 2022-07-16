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
import AppIcon from "./common/AppIcon";

import "./AppPreferencesButton.scss";

const AppPreferencesButton = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.preferences.value);

  const handlePrefChange = (key, value) => {
    let newPrefs = { ...preferences };
    newPrefs[key] = value;
    dispatch(preferencesChange(newPrefs));
  };

  return (
    <Dropdown className="prefButtonContainer">
      <Dropdown.Toggle
        variant="link"
        bsPrefix="p-0"
        className="prefButtonToggle"
      >
        <AppIcon name="cog" className="prefButton" />
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
                preferences["hideCompletedTasks"] === true && (
                  <AppIcon name="check" />
                )}
            </div>
            <div className="prefItemText">Hide Completed Tasks</div>
          </div>
        </NavDropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AppPreferencesButton;
