import React from "react";

import "./AppTaskListItemInfo.scss";

function TaskListItemInfo({
  task,
}) {
  return (
    <div className="taskListItemInfo">
      <div>
        <span className="taskTitle">
          {task.title}
        </span>
      </div>
      <div>
        <span className="taskDesc">{task.desc}</span>
      </div>
    </div>
  );
}

export default TaskListItemInfo;
