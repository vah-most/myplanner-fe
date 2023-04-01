/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import "./TaskListItemInfo.scss";

function TaskListItemInfo({ task }) {
  return (
    <div className="taskListItemInfo">
      <div>
        <span className="taskTitle">{task.title}</span>
      </div>
      <div className="taskDescContainer">
        <span className="taskDesc" id={`task_${task._id}`}>
          {task.desc}
        </span>
      </div>
    </div>
  );
}

export default TaskListItemInfo;
