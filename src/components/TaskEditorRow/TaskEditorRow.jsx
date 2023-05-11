/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import "./TaskEditorRow.scss";

const TaskEditorRow = ({ children, label }) => {
  return (
    <div className="taskEditorRow">
      <div className="taskEditorItemLabel">{label}</div>
      <div className="taskEditorItemValue">{children}</div>
    </div>
  );
};

export default TaskEditorRow;
