/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AppTextBubble from "../common/AppTextBubble";

import "./TaskListItemTags.scss";

const TaskListItemTags = ({ tags }) => {
  return (
    <div className="taskTags">
      {tags.map((tag, i) => {
        return <AppTextBubble key={i} className="taskTagsItem" text={tag} />;
      })}
    </div>
  );
};

export default TaskListItemTags;
