/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import AppTooltip from "./common/AppTooltip";

import "./AppTaskListItemInfo.scss";

function TaskListItemInfo({ task }) {
  return (
    <div className="taskListItemInfo">
      <div>
        <span className="taskTitle">{task.title}</span>
      </div>
      <div className="taskDescContainer">
        <span className="taskDesc" id={`task_${task.id}`}>
          {task.desc}
        </span>
        <AppTooltip target={`task_${task.id}`}>{task.desc}</AppTooltip>
      </div>
    </div>
  );
}

export default TaskListItemInfo;
