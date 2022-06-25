import React from "react";

import AppTextBubble from "./common/AppTextBubble";

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
      <div className="taskGroups">
        {task.groups.map((group, i) => {
          return <AppTextBubble key={i} text={group} />;
        })}
      </div>
    </div>
  );
}

export default TaskListItemInfo;
