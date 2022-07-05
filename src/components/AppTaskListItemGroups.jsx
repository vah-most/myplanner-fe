/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AppTextBubble from "./common/AppTextBubble";

import "./AppTaskListItemGroups.scss";

const AppTaskListItemGroups = ({ groups }) => {
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

export default AppTaskListItemGroups;
