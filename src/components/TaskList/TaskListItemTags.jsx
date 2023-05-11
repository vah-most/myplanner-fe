/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import TextBubble from "../common/TextBubble";

import "./TaskListItemTags.scss";

const TaskListItemTags = ({ tags }) => {
  return (
    <div className="taskTags">
      {tags.map((tag, i) => {
        return <TextBubble key={i} className="taskTagsItem" text={tag} />;
      })}
    </div>
  );
};

export default TaskListItemTags;
