/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AppTextBubble from "../common/AppTextBubble";

import "./TaskListItemGroups.scss";

const TaskListItemGroups = ({ groups }) => {
  return (
    <div className="taskGroups">
      {groups.map((group, i) => {
        return (
          <AppTextBubble key={i} className="taskGroupsItem" text={group} />
        );
      })}
    </div>
  );
};

export default TaskListItemGroups;
