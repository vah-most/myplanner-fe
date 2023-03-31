/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AppTooltip from "./AppTooltip";

import "./AppAddButton.scss";
import { Plus } from "react-bootstrap-icons";

const AppAddButton = ({ className, onClick, style, ...extra }) => {
  return (
    <div
      className={`addButton hand ${className}`}
      id="button_new_task"
      onClick={onClick}
      style={style}
      {...extra}
    >
      <Plus className="addButtonIcon" />
      <AppTooltip target="button_new_task">
        <span>Add new task </span>
        <span className="shortcutText">(F2)</span>
      </AppTooltip>
    </div>
  );
};

export default AppAddButton;
